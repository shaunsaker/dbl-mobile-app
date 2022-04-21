import React, { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Typography } from '../../components/Typography';
import { useBTCUSDRate } from '../../components/useBTCUSDRate';
import { firebaseReserveTickets } from '../../firebase/firestore/firebaseReserveTickets';
import { Routes } from '../../router/models';
import { Lot, MAX_BTC_DIGITS } from '../../store/lots/models';
import { selectActiveLot } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { TicketId } from '../../store/tickets/models';
import { maybePluralise } from '../../utils/maybePluralise';
import { numberToDigits } from '../../utils/numberToDigits';

const getTicketOdds = ({
  userTickets,
  lotTickets,
}: {
  userTickets: number;
  lotTickets: number;
}): string => {
  return `1 in ${numberToDigits(lotTickets + 1 / userTickets, 0)}`;
};

interface ReserveTicketsProps {}

export const ReserveTickets = ({}: ReserveTicketsProps): ReactElement => {
  const dispatch = useDispatch();

  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const rate = useBTCUSDRate();

  const activeLot = useSelector(selectActiveLot) as Lot;

  // calculate the ticket prices in USD and BTC
  const pricePerTicketUSD = activeLot ? activeLot.ticketPriceUSD : 0;
  const pricePerTicketBTC =
    activeLot && rate ? activeLot.ticketPriceUSD / rate : 0;
  const ticketsValueUSD = numberToDigits(pricePerTicketUSD * ticketCount, 0);
  const ticketsValueBTC = numberToDigits(
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

      // limit ticket purchases to the totalAvailableTickets
      if (newTickets > activeLot.totalAvailableTickets) {
        newTickets = activeLot.totalAvailableTickets;
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

    setLoading(false);

    dispatch(
      navigate({
        route: Routes.ticketPayment,
        props: {
          lotId: activeLot.id,
          ticketIds: reserveTicketsResponse.data as TicketId[],
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
          {maybePluralise(ticketCount, 'ticket')} = {ticketsValueBTC} BTC ($
          {ticketsValueUSD})
        </Typography>

        <Typography>
          Your odds are{' '}
          {getTicketOdds({
            userTickets: ticketCount,
            lotTickets: activeLot.totalConfirmedTickets,
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
