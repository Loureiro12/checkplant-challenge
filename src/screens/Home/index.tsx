import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import {Marker, type Region} from 'react-native-maps';

import {AppNavigatorRoutesProps} from '../../routes/app.routes';

import Button from '../../components/Button';
import Map from '../../components/Map';
import Loading from '../../components/Loading';
import NotLocation from '../../components/NotLocation';

import {Container, ContentButtons} from './styles';

export default function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [isAuthorizationAccessLocation, setIsAuthorizationAccessLocation] =
    useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      await Geolocation.requestAuthorization('always');
      Geolocation.getCurrentPosition(
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
          console.log(error.code);
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
          {/* {savedNotes?.map((e) => (
            <Marker
              key={e.datetime}
              coordinate={{
                latitude: parseFloat(e.latitude),
                longitude: parseFloat(e.longitude),
              }}
              title={`Anotação feita em: ${moment(
                e.datetime,
              ).format('DD/MM/YYYY - HH:mm')}`}
              description={e.annotation}
              pinColor={e.synced === 'true' ? 'gray' : 'green'}
            />
          ))} */}
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
        />
      </ContentButtons>
    </Container>
  );
}
