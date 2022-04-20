import React, { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Typography } from '../../components/Typography';
import { firebaseReserveTickets } from '../../firebase/firestore/firebaseReserveTickets';
import { Routes } from '../../router/models';
import { Lot, MAX_BTC_DIGITS } from '../../store/lots/models';
import { selectActiveLot } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { numberToDigits } from '../../utils/numberToDigits';

const getTicketOdds = ({
  userTickets,
  lotTickets,
}: {
  userTickets: number;
  lotTickets: number;
}): string => {
  return `1 in ${numberToDigits(lotTickets / userTickets, 0)}`;
};

interface ReserveTicketsProps {}

export const ReserveTickets = ({}: ReserveTicketsProps): ReactElement => {
  const dispatch = useDispatch();

  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const activeLot = useSelector(selectActiveLot) as Lot;
  const pricePerTicketBTC = activeLot ? activeLot.ticketPriceInBTC : 0;
  const pricePerTicketUSD = activeLot
    ? numberToDigits(activeLot.ticketPriceInBTC * activeLot.BTCPriceInUSD, 0)
    : 0;
  const ticketValueBTC = numberToDigits(
    pricePerTicketBTC * ticketCount,
    MAX_BTC_DIGITS,
  );
  const isSubmitDisabled = !ticketCount || loading;

  const onAddTickets = useCallback(
    (ticketsToAdd: number) => {
      // satisy ts
      if (!activeLot) {
        return;
      }

      let newTickets = ticketCount + ticketsToAdd;

      if (newTickets < 0) {
        return;
      }

      // limit ticket purchases to the ticketsAvailable
      if (newTickets > activeLot.ticketsAvailable) {
        newTickets = activeLot.ticketsAvailable;
      }

      // or perUserTicketLimit
      if (newTickets > activeLot.perUserTicketLimit) {
        newTickets = activeLot.perUserTicketLimit;
      }

      setTicketCount(newTickets);
    },
    [ticketCount, setTicketCount, activeLot],
  );

  const onSubmitPress = useCallback(async () => {
    setLoading(true);

    // FIXME: handle error
    const reserveTicketsResponse = await firebaseReserveTickets({
      lotId: activeLot.id,
      ticketCount,
    });

    // TODO: SS reserveTicketsResponse is double response
    console.log('HERE', { reserveTicketsResponse });

    setLoading(false);

    dispatch(
      navigate({
        route: Routes.ticketPayment,
        props: {
          ticketIds: [],
        },
      }),
    );
  }, [activeLot, ticketCount, dispatch]);

  return (
    <Page>
      <HeaderBar showBackButton />

      <Container>
        <Typography>How many ticketCount would you like to buy?</Typography>

        <PrimaryButton small secondary onPress={() => onAddTickets(-1)}>
          -
        </PrimaryButton>

        <Typography large bold>
          {ticketCount}
        </Typography>

        <PrimaryButton small secondary onPress={() => onAddTickets(1)}>
          +
        </PrimaryButton>

        <Typography>
          {ticketCount} ticketCount = {ticketValueBTC} BTC ($
          {numberToDigits(pricePerTicketUSD * ticketCount, 0)})
        </Typography>

        <Typography>
          Your odds are{' '}
          {getTicketOdds({
            userTickets: ticketCount,
            lotTickets: activeLot.ticketsAvailable,
          })}
        </Typography>

        <PrimaryButton disabled={isSubmitDisabled} onPress={onSubmitPress}>
          {loading ? 'RESERVING YOUR TICKETS' : 'RESERVE TICKETS'}
        </PrimaryButton>
      </Container>
    </Page>
  );
};

const Container = styled.View``;
