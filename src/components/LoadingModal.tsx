import React, { ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../theme/colors';

interface LoadingModalProps {}

export const LoadingModal = ({}: LoadingModalProps): ReactElement => {
  return (
    <Container>
      <ActivityIndicator size="large" color={colors.white} />
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${colors.backdrop};
  justify-content: center;
  align-items: center;
`;
