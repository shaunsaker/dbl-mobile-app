import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { Page } from '../../components/Page';
import { Typography } from '../../components/Typography';
import { RouteProps, Routes } from '../../router/models';

interface TicketPaymentProps extends RouteProps<Routes.ticketPayment> {}

export const TicketPayment = ({ route }: TicketPaymentProps): ReactElement => {
  const ticketIds = route.params.ticketIds;

  return (
    <Page>
      <HeaderBar showBackButton />

      <Container>
        <Typography>Ticket Payment</Typography>
      </Container>
    </Page>
  );
};

const Container = styled.View``;
