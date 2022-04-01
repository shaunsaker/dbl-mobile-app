import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { BuyTickets } from '../../../components/BuyTickets';
import { Typography } from '../../../components/Typography';

interface OnboardingBuyTicketProps {
  onSubmit: () => void;
}

export const OnboardingBuyTickets = ({
  onSubmit,
}: OnboardingBuyTicketProps): ReactElement => {
  return (
    <Container collapsable={false}>
      <Typography large bold>
        Onboarding Buy Ticket (3/4)
      </Typography>

      <BuyTickets instructionsCollapsed={false} onSubmit={onSubmit} />
    </Container>
  );
};

const Container = styled.View``;
