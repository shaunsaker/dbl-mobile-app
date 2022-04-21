import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { LotId } from '../../store/lots/models';
import { ApplicationState } from '../../store/reducers';
import { selectTicketsByLotId } from '../../store/tickets/selectors';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { objectToArray } from '../../utils/objectToArray';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { Typography } from '../Typography';
import { Ticket } from './Ticket';

interface MyTicketsProps {
  lotId: LotId;
}

export const MyTickets = ({ lotId }: MyTicketsProps): ReactElement => {
  const tickets = useSelector((state: ApplicationState) =>
    selectTicketsByLotId(state, lotId),
  );

  // convert the tickets object to an array
  // sort them from newest to oldest
  const sortedTicketsArray = tickets
    ? sortArrayOfObjectsByKey(objectToArray(tickets), 'dateCreated', true)
    : [];

  const userHasActiveLotTickets = tickets && !isObjectEmpty(tickets);

  return (
    <Container>
      <Typography bold>My Tickets</Typography>

      {userHasActiveLotTickets ? (
        sortedTicketsArray.map(ticket => (
          <Ticket key={ticket.id} lotId={lotId} {...ticket} />
        ))
      ) : (
        <Typography>You have no tickets, shame on you!</Typography>
      )}
    </Container>
  );
};

const Container = styled.View``;
