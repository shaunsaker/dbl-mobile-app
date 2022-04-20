import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { LotStats } from '../../components/LotStats';
import { Page } from '../../components/Page';
import { Results } from '../../components/Results';
import { Typography } from '../../components/Typography';

interface HomeProps {}

export const Home = ({}: HomeProps): ReactElement => {
  return (
    <Page>
      <HeaderBar />

      <Container>
        <Typography bold>Home</Typography>

        <Results />

        <LotStats />

        <Typography>My Ticket(s)</Typography>
      </Container>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;
