import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { Page } from '../../components/Page';

interface HomeProps {}

export const Home = ({}: HomeProps): ReactElement => {
  return (
    <Page>
      <Container />
    </Page>
  );
};

const Container = styled.View``;
