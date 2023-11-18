import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.COLORS.GRAY_600};
`;

export const Title = styled.Text`
  margin-top: 10px;
  ${({theme}) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GREEN_700};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(({theme}) => ({
  color: theme.COLORS.GREEN_700,
}))``;
