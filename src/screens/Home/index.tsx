import React from 'react';

import {Marker, type Region} from 'react-native-maps';

import Button from '../../components/Button';
import Map from '../../components/Map';
import Loading from '../../components/Loading';

import {Container, ContentButtons} from './styles';

export default function Home() {
  return (
    <Container>
      {/* {initialRegion ? (
        <Map initialRegion={initialRegion}>
          {savedNotes?.map((e) => (
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
          ))}
        </Map>
      ) : (
        <Loading title="Carregando mapa..." />
      )} */}

      <ContentButtons>
        <Button
          type="PRIMARY"
          title="Adicionar"
          // onPress={() => {
          //   navigation.navigate('AddAnnotation');
          // }}
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
