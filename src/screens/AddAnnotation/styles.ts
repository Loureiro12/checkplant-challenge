import styled from 'styled-components/native';

import {SafeAreaView} from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${({theme}) => theme.COLORS.GRAY_400};
`;
