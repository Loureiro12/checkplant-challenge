import React from 'react';

import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {BackButton, BackButtonText, Container, Content, Title} from './styles';

interface HeaderProps {
  title: string;
}

export default function Header({title}: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <>
      <StatusBar barStyle="light-content" />

      <Container>
        <Content>
          <BackButton onPress={handleGoBack}>
            <BackButtonText>Voltar</BackButtonText>
          </BackButton>
          <Title>{title}</Title>
        </Content>
      </Container>
    </>
  );
}
