import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { Typography } from '../../Typography';

interface TicketPaymentProps {
  onSubmit: () => void;
}

export const TicketPayment = ({
  onSubmit,
}: TicketPaymentProps): ReactElement => {
  return (
    <Container>
      <Typography bold>Ticket Payment</Typography>
    </Container>
  );
};

const Container = styled.View``;
