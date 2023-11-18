import {TouchableOpacity} from 'react-native';

import styled, {css} from 'styled-components/native';

export type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY';

interface Props {
  type: ButtonIconTypeStyleProps;
  mt?: number;
}

export const Container = styled(TouchableOpacity)<Props>`
  min-height: 56px;
  max-height: 56px;
  background-color: ${({theme, type}) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.WHITE};

  margin-top: ${({mt}) => mt}px;
  border: 1px solid ${({theme}) => theme.COLORS.GREEN_700};
  border-radius: 6px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${props =>
    (props.disabled ?? false) &&
    css`
      opacity: 0.5;
    `}
`;

export const Title = styled.Text<Props>`
  margin-left: 5px;
  ${({theme, type}) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${type === 'PRIMARY' ? theme.COLORS.WHITE : theme.COLORS.GREEN_700};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(({theme}) => ({
  color: theme.COLORS.GRAY_700,
}))``;
