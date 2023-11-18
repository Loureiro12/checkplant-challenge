import React from 'react';
import {Container, LoadIndicator, Title} from './styles';

interface LoadingProps {
  title?: string;
}

export default function Loading({title}: LoadingProps) {
  return (
    <Container>
      <LoadIndicator />
      {title && <Title>{title}</Title>}
    </Container>
  );
}
