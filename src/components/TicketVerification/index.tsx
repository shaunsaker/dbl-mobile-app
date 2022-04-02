import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { selectUserActiveLotTicketsPendingDepositCount } from '../../store/userActiveLotTickets/selectors';
import { maybePluralise } from '../../utils/maybePluralise';
import { Typography } from '../Typography';

interface TicketVerificationProps {}

// TODO: There may be some loading state needed here
export const TicketVerification =
  ({}: TicketVerificationProps): ReactElement => {
    const userActiveLotTicketsPendingDepositCount = useSelector(
      selectUserActiveLotTicketsPendingDepositCount,
    );

    return (
      <Container>
        <Typography>Ticket Verification</Typography>

        <Typography>
          You have{' '}
          {maybePluralise(userActiveLotTicketsPendingDepositCount, 'ticket')}{' '}
          pending verification. We will notifiy you once we've received your BTC
          and activated your ticket's.
        </Typography>
      </Container>
    );
  };

const Container = styled.View``;
