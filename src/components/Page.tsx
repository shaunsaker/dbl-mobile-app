import React, { ReactElement, ReactNode } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../theme/colors';

const BACKGROUND_COLOR = colors.white;

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps): ReactElement => {
  return (
    <Container>
      {children}

      <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${BACKGROUND_COLOR};
`;
