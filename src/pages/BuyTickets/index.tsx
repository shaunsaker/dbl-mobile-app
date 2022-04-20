import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { Page } from '../../components/Page';
import { BuyTickets as BuyTicketsComponent } from '../../components/BuyTickets';

interface BuyTicketsProps {}

export const BuyTickets = ({}: BuyTicketsProps): ReactElement => {
  return (
    <Page>
      <HeaderBar showBackButton />

      <Container>
        <BuyTicketsComponent />
      </Container>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;
