import {type TouchableOpacityProps} from 'react-native';

import {
  Container,
  ButtonIconTypeStyleProps,
  Title,
  LoadIndicator,
} from './styles';

type Props = TouchableOpacityProps & {
  type: ButtonIconTypeStyleProps;
  title: string;
  mt?: number;
  loading?: boolean;
  textLoading?: string;
};

export default function Button({
  title,
  mt = 0,
  textLoading,
  loading,
  type = 'PRIMARY',
  ...rest
}: Props) {
  return (
    <Container type={type} mt={mt} disabled={loading} {...rest}>
      {loading && <LoadIndicator />}
      <Title type={type}>{loading && textLoading ? textLoading : title}</Title>
    </Container>
  );
}
