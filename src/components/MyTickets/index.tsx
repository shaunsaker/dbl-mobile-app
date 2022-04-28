import React, { ReactElement, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { LotId } from '../../store/lots/models';
import { selectActiveLotId } from '../../store/lots/selectors';
import { ApplicationState } from '../../store/reducers';
import { fetchTickets } from '../../store/tickets/actions';
import { selectTicketsByLotId } from '../../store/tickets/selectors';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { Typography } from '../Typography';
import { Ticket } from './Ticket';

interface MyTicketsProps {
  lotId: LotId;
}

export const MyTickets = ({ lotId }: MyTicketsProps): ReactElement => {
  const dispatch = useDispatch();

  const isActiveLot = useSelector(selectActiveLotId) === lotId;

  const tickets = useSelector((state: ApplicationState) =>
    selectTicketsByLotId(state, lotId),
  );

  // convert the tickets object to an array
  // sort them from newest to oldest
  const sortedTicketsArray = tickets
    ? sortArrayOfObjectsByKey(tickets, 'dateCreated', true)
    : [];

  const userHasTickets = tickets && !isObjectEmpty(tickets);

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

  return (
    <Container>
      <Typography bold>My Tickets</Typography>

      {userHasTickets ? (
        sortedTicketsArray.map(ticket => <Ticket key={ticket.id} {...ticket} />)
      ) : (
        <Typography>You have no tickets, shame on you!</Typography>
      )}
    </Container>
  );
};

const Container = styled.View`
  border-width: 1px;
`;
