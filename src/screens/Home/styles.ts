import styled from 'styled-components/native';

import {SafeAreaView} from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  background-color: ${({theme}) => theme.COLORS.GRAY_400};
`;

export const ContentButtons = styled.View`
  padding: 24px;
  margin-bottom: 20px;
  justify-content: center;
`;
