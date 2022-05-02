import React, { ReactElement, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../router/models';
import { LotId } from '../../store/lots/models';
import { selectActiveLotId, selectLotById } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { ApplicationState } from '../../store/reducers';
import { fetchTickets } from '../../store/tickets/actions';
import { TicketStatus } from '../../store/tickets/models';
import {
  selectTicketsByLotId,
  selectTicketsByLotIdGroupedByStatus,
} from '../../store/tickets/selectors';
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
    selectTicketsByLotIdGroupedByStatus(state, lotId),
  );
  const tickets = useSelector((state: ApplicationState) =>
    selectTicketsByLotId(state, lotId),
  );

  const hasConfirmedTickets =
    ticketsGroupedByStatus[TicketStatus.confirmed].length;

  const ticketOdds = getTicketOdds({
    newUserTicketCount: 0,
    existingUserTicketCount:
      ticketsGroupedByStatus[TicketStatus.confirmed].length,
    totalLotTicketCount: lot?.totalConfirmedTickets || 0,
  });

  useLayoutEffect(
    () => {
      // we only fetch tickets for lot results because we sync on active lot tickets
      if (!isActiveLot) {
        dispatch(fetchTickets.request({ lotId }));
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
        {ticketsGroupedByStatus[TicketStatus.reserved].length ? (
          <Typography>
            {ticketsGroupedByStatus[TicketStatus.reserved].length} Awaiting
            Payment
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[TicketStatus.paymentReceived].length ? (
          <Typography>
            {ticketsGroupedByStatus[TicketStatus.paymentReceived].length}{' '}
            Payment Received
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[TicketStatus.confirmed].length ? (
          <Typography>
            {ticketsGroupedByStatus[TicketStatus.confirmed].length} Confirmed
          </Typography>
        ) : null}

        {ticketsGroupedByStatus[TicketStatus.expired].length ? (
          <Typography>
            {ticketsGroupedByStatus[TicketStatus.expired].length} Expired
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
