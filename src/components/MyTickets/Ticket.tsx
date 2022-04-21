import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../router/models';
import { LotId } from '../../store/lots/models';
import { navigate } from '../../store/navigation/actions';
import { Ticket as TicketType, TicketStatus } from '../../store/tickets/models';
import { getFormattedTime } from '../../utils/getFormattedTime';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
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

interface TicketProps extends TicketType {
  lotId: LotId;
}

export const Ticket = ({
  lotId,
  price,
  status,
  dateCreated,
  invoiceTicketIds,
}: TicketProps): ReactElement => {
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    dispatch(
      navigate({
        route: Routes.ticketPayment,
        props: {
          lotId,
          ticketIds: invoiceTicketIds,
        },
      }),
    );
  }, [dispatch, invoiceTicketIds, lotId]);

  return (
    <Container onPress={onPress}>
      <Typography>{getFormattedTime(dateCreated)}</Typography>

      <Typography>{price} BTC</Typography>

      <StatusIcon
        style={{
          backgroundColor: getTicketStatusIconColor(status),
        }}
      />
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
`;

const STATUS_ICON_SIZE = 10;

const StatusIcon = styled.View`
  width: ${STATUS_ICON_SIZE}px;
  height: ${STATUS_ICON_SIZE}px;
  border-radius: ${STATUS_ICON_SIZE / 2}px;
`;
