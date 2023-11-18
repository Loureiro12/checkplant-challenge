import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
  justify-content: space-between;
  padding: 20px;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const BackButtonText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const BackButton = styled.TouchableOpacity``;
