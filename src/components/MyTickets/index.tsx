import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { selectActiveLotTickets } from '../../store/tickets/selectors';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { objectToArray } from '../../utils/objectToArray';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { Typography } from '../Typography';
import { Ticket } from './Ticket';

interface MyTicketsProps {}

export const MyTickets = ({}: MyTicketsProps): ReactElement => {
  const tickets = useSelector(selectActiveLotTickets);

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
        sortedTicketsArray.map(ticket => <Ticket key={ticket.id} {...ticket} />)
      ) : (
        <Typography>You have no tickets, shame on you!</Typography>
      )}
    </Container>
  );
};

const Container = styled.View``;
