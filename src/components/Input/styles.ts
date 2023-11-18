import styled, {css} from 'styled-components/native';
import {TextInput} from 'react-native';

interface Props {
  message: string | undefined;
}

export const Container = styled(TextInput)<Props>`
  flex: 1;

  max-height: 56px;
  min-height: 56px;

  background-color: ${({theme}) => theme.COLORS.GRAY_700};
  color: ${({theme}) => theme.COLORS.WHITE};
  border: 1px solid
    ${({theme, message}) =>
      message != null ? theme.COLORS.RED : theme.COLORS.GRAY_700};

  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;

  border-radius: 6px;
  padding: 16px;
`;

export const TextError = styled.Text`
  margin-top: 10px;
  ${({theme}) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.RED};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;
