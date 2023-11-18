import React, {type ReactNode} from 'react';

import {type Region} from 'react-native-maps';

import {Container, ContainerMapView} from './styles';

interface MapProps {
  initialRegion: Region | undefined;
  children: ReactNode;
}

export default function Map({initialRegion, children}: MapProps) {
  return (
    <Container>
      {initialRegion != null && (
        <ContainerMapView initialRegion={initialRegion}>
          {children}
        </ContainerMapView>
      )}
    </Container>
  );
}
