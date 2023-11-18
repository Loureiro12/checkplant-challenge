import styled from 'styled-components/native';

import MapView from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ContainerMapView = styled(MapView)`
  width: 100%;
  height: 100%;
`;
