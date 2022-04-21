import moment from 'moment';
import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components/native';
import { BlockchainAddress } from '../../components/BlockchainAddress';
import { CopyIcon } from '../../components/CopyIcon';
import { HeaderBar } from '../../components/HeaderBar';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Typography } from '../../components/Typography';
import { RouteProps, Routes } from '../../router/models';
import { navigate } from '../../store/navigation/actions';
import { ApplicationState } from '../../store/reducers';
import { TicketStatus } from '../../store/tickets/models';
import { selectTicketById } from '../../store/tickets/selectors';
import { maybePluralise } from '../../utils/maybePluralise';

interface TicketPaymentProps extends RouteProps<Routes.ticketPayment> {}

export const TicketPayment = ({ route }: TicketPaymentProps): ReactElement => {
  const dispatch = useDispatch();

  // get the invoice payment info using the ticketIds
  // NOTE: we only need one ticketId since the invoice payment info
  // will be the same in all of these tickets
  const { lotId, ticketIds } = route.params;
  const ticket = useSelector((state: ApplicationState) =>
    selectTicketById(state, { lotId, ticketId: ticketIds[0] }),
  );
  const invoicePaymentAddress = ticket?.invoicePaymentAddress || '';
  const invoicePaymentTotal = ticket?.invoicePaymentAmountBTC || 0;
  const invoicePaymentExpiry = ticket?.invoicePaymentExpiry || '';

  const hasTicketExpired = ticket?.status === TicketStatus.expired;
  const hasTicketBeenConfirmed = ticket?.status === TicketStatus.confirmed;
  const hasTicketReceivedPayment =
    ticket?.status === TicketStatus.paymentReceived;

  const { minutes, seconds } = useTimer({
    expiryTimestamp: moment(invoicePaymentExpiry).toDate(),
  });

  const onSubmitPress = useCallback(() => {
    dispatch(navigate({ route: Routes.home }));
  }, [dispatch]);

  return (
    <Page>
      <HeaderBar showBackButton />

      <Container>
        {hasTicketExpired ? (
          <Typography>
            Your ticket{ticketIds.length > 1 ? 's have' : ' has'} expired.
          </Typography>
        ) : hasTicketBeenConfirmed ? (
          <Typography>
            Great success 🎉 Your payment has been confirmed and your ticket
            {ticketIds.length > 1 ? 's' : ''} have been entered into today's
            draw 🤞
          </Typography>
        ) : hasTicketReceivedPayment ? (
          <Typography>
            We're processing your payment. Once it has received 6 confirmations
            on the blockchain, we will enter your ticket
            {ticketIds.length > 1 ? 's' : ''} into the draw.
          </Typography>
        ) : (
          <>
            <Typography>
              Your {maybePluralise(ticketIds.length, 'ticket')}{' '}
              {ticketIds.length > 1 ? 'are' : 'is'} reserved for
            </Typography>

            <Typography bold>
              {minutes}m {seconds}s
            </Typography>

            <Typography>To complete the purchase</Typography>

            <Typography bold>Pay</Typography>

            <Typography large bold>
              {invoicePaymentTotal} BTC
              <CopyIcon value={invoicePaymentTotal.toString()} />
            </Typography>

            <Typography bold>to the following address:</Typography>

            <BlockchainAddress>{invoicePaymentAddress}</BlockchainAddress>

            <PrimaryButton onPress={onSubmitPress}>
              I'VE SENT MY BITCOIN
            </PrimaryButton>
          </>
        )}
      </Container>
    </Page>
  );
};

const Container = styled.View``;
