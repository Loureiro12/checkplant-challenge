import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Marker, type Region} from 'react-native-maps';
import moment from 'moment';
import {useNetInfo} from '@react-native-community/netinfo';

import {type AppNavigatorRoutesProps} from '../../routes/app.routes';
import {type AnnotationDTO} from '../../dtos/AnnotationDTO';
import {api} from '../../services/api';
import {useQuery, useRealm} from '../../libs/realm/index';
import {Annotation} from '../../libs/realm/schemas/Annotation';

import Button from '../../components/Button';
import Map from '../../components/Map';
import Loading from '../../components/Loading';
import NotLocation from '../../components/NotLocation';

import {Container, ContentButtons} from './styles';

export default function Home() {
  const netInfo = useNetInfo();
  const realm = useRealm();
  const annotations = useQuery(Annotation);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [savedNotes, setSavedNotes] = useState<AnnotationDTO[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [loadingSyncData, setLoadingSyncData] = useState(false);
  const [isAuthorizationAccessLocation, setIsAuthorizationAccessLocation] =
    useState(true);

  async function loadingAnnotation() {
    const formatAnnotations: AnnotationDTO[] = Array.from(annotations);
    setSavedNotes(formatAnnotations);
  }

  async function synchronize(annotation: AnnotationDTO) {
    try {
      const {data} = await api.post(
        '/jla9rg/?email_key=contato.loureiro1@gmail.com',
        annotation,
      );

      if (data.status === 'success') {
        realm.write(() => {
          const item = realm
            .objects('Annotation')
            .filtered(`id == "${annotation.id}"`)[0];
          if (item) {
            item.synced = 'true';
          }
        });

        const index = savedNotes.findIndex(
          objeto => objeto.id === annotation.id,
        );

        savedNotes[index] = {
          ...savedNotes[index],
          synced: 'true',
        };
        setSavedNotes(savedNotes);

        return {status: 'success'};
      }

      return {status: 'error'};
    } catch (error) {
      return {status: 'error'};
    }
  }

  async function handleSyncDataNotSynchronized() {
    setLoadingSyncData(true);
    if (!netInfo.isConnected) {
      Alert.alert(
        'Erro',
        'Para realizar a sincronização você deve estar conectado a internet!',
      );
      setLoadingSyncData(false);
      return;
    }

    const dataNotSynchronized = savedNotes.filter(
      item => item.synced === 'false',
    );

    if (dataNotSynchronized.length === 0) {
      Alert.alert(
        'Sucesso',
        'Todos os dados já foram sincronizados com sucesso!',
      );
      setLoadingSyncData(false);
      return;
    }

    try {
      const results = await Promise.all(
        dataNotSynchronized.map(async data => synchronize(data)),
      );

      const allSuccess = results.every(result => result.status === 'success');

      if (allSuccess) {
        Alert.alert(
          'Sucesso',
          'Todos os dados foram sincronizados com sucesso!',
        );
        return;
      }
      Alert.alert(
        'Erro',
        'Algumas sincronizações falharam. Tente novamente mais tarde!',
      );
    } catch (error) {
      console.log('error', error);
      Alert.alert(
        'Erro',
        'Erro ao sincronizar alguns dados. Tente novamente mais tarde!',
      );
    } finally {
      setLoadingSyncData(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadingAnnotation();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    const requestLocationPermission = async () => {
      await Geolocation.requestAuthorization('always');
      await Geolocation.getCurrentPosition(
        position => {
          setInitialRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setIsAuthorizationAccessLocation(true);
        },
        error => {
          if (error.code === 1) {
            setIsAuthorizationAccessLocation(false);
          }
        },
      );
    };

    requestLocationPermission();
  }, []);
  return (
    <Container>
      {!isAuthorizationAccessLocation ? (
        <NotLocation />
      ) : initialRegion ? (
        <Map initialRegion={initialRegion}>
          {savedNotes?.map(e => (
            <Marker
              key={e.datetime}
              coordinate={{
                latitude: parseFloat(e.latitude),
                longitude: parseFloat(e.longitude),
              }}
              title={`Anotação feita em: ${moment(e.datetime).format(
                'DD/MM/YYYY - HH:mm',
              )}`}
              description={e.annotation}
              pinColor={e.synced === 'true' ? 'gray' : 'green'}
            />
          ))}
        </Map>
      ) : (
        <Loading title="Carregando mapa..." />
      )}

      <ContentButtons>
        <Button
          type="PRIMARY"
          title="Adicionar"
          onPress={() => {
            navigation.navigate('AddAnnotation');
          }}
        />
        <Button
          type="SECONDARY"
          title="Sincronizar"
          textLoading="Sincronização em andamento..."
          mt={10}
          loading={loadingSyncData}
          onPress={handleSyncDataNotSynchronized}
        />
      </ContentButtons>
    </Container>
  );
}
