import {type TextInput, type TextInputProps} from 'react-native';
import {useTheme} from 'styled-components/native';

import {Container, TextError} from './styles';

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
  messageError: string | undefined;
};

export default function Input({inputRef, messageError, ...rest}: Props) {
  const {COLORS} = useTheme();

  return (
    <>
      <Container
        message={messageError}
        placeholderTextColor={COLORS.GRAY_300}
        {...rest}
        ref={inputRef}
      />
      <TextError>{messageError}</TextError>
    </>
  );
}
