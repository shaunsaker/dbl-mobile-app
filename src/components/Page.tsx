import React, { ReactElement, ReactNode } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { colors } from '../theme/colors';

const BACKGROUND_COLOR = colors.white;

interface PageProps extends SafeAreaViewProps {
  children: ReactNode;
}

export const Page = ({ children, ...props }: PageProps): ReactElement => {
  return (
    <Container {...props} accessibilityRole={undefined}>
      {children}

      <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${BACKGROUND_COLOR};
`;
