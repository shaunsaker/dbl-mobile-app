import React, { ReactElement, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../router/models';
import { fetchInvoices } from '../../store/invoices/actions';
import { InvoiceStatus } from '../../store/invoices/models';
import {
  selectTicketIdsByLotId,
  selectTicketIdsByLotIdGroupedByStatus,
} from '../../store/invoices/selectors';
import { LotId } from '../../store/lots/models';
import { selectActiveLotId, selectLotById } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { ApplicationState } from '../../store/reducers';
import { getTicketOdds } from '../../utils/getTicketOdds';
import { maybePluralise } from '../../utils/maybePluralise';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { Typography } from '../Typography';

interface TicketsSummaryProps {
  lotId: LotId;
}

export const TicketsSummary = ({
  lotId,
}: TicketsSummaryProps): ReactElement => {
  const dispatch = useDispatch();

  const lot = useSelector((state: ApplicationState) =>
    selectLotById(state, lotId),
  );
  const isActiveLot = useSelector(selectActiveLotId) === lotId;
  const ticketsGroupedByStatus = useSelector((state: ApplicationState) =>
    selectTicketIdsByLotIdGroupedByStatus(state, lotId),
  );
  const tickets = useSelector((state: ApplicationState) =>
    selectTicketIdsByLotId(state, lotId),
  );

  const hasConfirmedTickets =
    ticketsGroupedByStatus[InvoiceStatus.confirmed].length;

  const ticketOdds = getTicketOdds({
    newUserTicketCount: 0,
    existingUserTicketCount:
      ticketsGroupedByStatus[InvoiceStatus.confirmed].length,
    totalLotTicketCount: lot?.totalConfirmedTickets || 0,
  });

  useLayoutEffect(
    () => {
      // we only fetch invoices for lot results because we already sync on active lot invoices
      if (!isActiveLot) {
        dispatch(fetchInvoices.request({ lotId }));
      }
    },
    // eslint-disable-next-line
    [],
  );

  const onPress = useCallback(() => {
    dispatch(navigate({ route: Routes.tickets, props: { lotId } }));
  }, [dispatch, lotId]);

  return (
    <Container onPress={onPress}>
      <Typography large bold>
        You {isActiveLot ? 'have' : 'had'}{' '}
        {maybePluralise(tickets.length, 'ticket')}
      </Typography>

      <Typography>
        {ticketsGroupedByStatus[InvoiceStatus.reserved].length ? (
          <Typography>
            {ticketsGroupedByStatus[InvoiceStatus.reserved].length} Awaiting
            Payment
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[InvoiceStatus.paymentReceived].length ? (
          <Typography>
            {ticketsGroupedByStatus[InvoiceStatus.paymentReceived].length}{' '}
            Payment Received
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[InvoiceStatus.confirmed].length ? (
          <Typography>
            {ticketsGroupedByStatus[InvoiceStatus.confirmed].length} Confirmed
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[InvoiceStatus.expired].length ? (
          <Typography>
            {ticketsGroupedByStatus[InvoiceStatus.expired].length} Expired
          </Typography>
        ) : null}
      </Typography>

      {hasConfirmedTickets ? (
        <Typography>Your odds of winning would be {ticketOdds}%</Typography>
      ) : null}
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)``;
