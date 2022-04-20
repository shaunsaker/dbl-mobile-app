import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { Ticket as TicketType, TicketStatus } from '../../store/tickets/models';
import { getFormattedTime } from '../../utils/getFormattedTime';
import { Typography } from '../Typography';

const getTicketStatusIconColor = (status: TicketStatus): string => {
  return status === TicketStatus.confirmed
    ? 'green'
    : status === TicketStatus.paymentReceived
    ? 'orange'
    : status === TicketStatus.expired
    ? 'red'
    : 'lightgray';
};

interface TicketProps extends TicketType {}

export const Ticket = ({
  price,
  status,
  dateCreated,
}: TicketProps): ReactElement => {
  return (
    <Container>
      <Typography>{getFormattedTime(dateCreated, true)}</Typography>

      <Typography>{price} BTC</Typography>

      <StatusIcon
        style={{
          backgroundColor: getTicketStatusIconColor(status),
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const STATUS_ICON_SIZE = 10;

const StatusIcon = styled.View`
  width: ${STATUS_ICON_SIZE}px;
  height: ${STATUS_ICON_SIZE}px;
  border-radius: ${STATUS_ICON_SIZE / 2}px;
`;
