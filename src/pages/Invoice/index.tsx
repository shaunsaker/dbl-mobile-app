import React, { ReactElement, useCallback, useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { BlockchainAddress } from '../../components/BlockchainAddress';
import { CopyIcon } from '../../components/CopyIcon';
import { CountdownTimer } from '../../components/CountdownTimer';
import { HeaderBar } from '../../components/HeaderBar';
import { Page } from '../../components/Page';
import { Payments } from '../../components/Payments';
import { Typography } from '../../components/Typography';
import { RouteProps, Routes } from '../../router/models';
import { fetchInvoice } from '../../store/invoices/actions';
import {
  selectInvoiceById,
  selectInvoicesDataLoading,
} from '../../store/invoices/selectors';
import { ApplicationState } from '../../store/reducers';
import { TicketStatus } from '../../store/tickets/models';
import { selectTicketById } from '../../store/tickets/selectors';
import { getTimeAsISOString } from '../../utils/getTimeAsISOString';
import { maybePluralise } from '../../utils/maybePluralise';

interface TicketPaymentProps extends RouteProps<Routes.invoice> {}

export const Invoice = ({ route }: TicketPaymentProps): ReactElement => {
  const dispatch = useDispatch();

  const { lotId, invoiceId } = route.params;

  const loading = useSelector(selectInvoicesDataLoading);
  const invoice = useSelector((state: ApplicationState) =>
    selectInvoiceById(state, invoiceId),
  );
  const ticket = useSelector((state: ApplicationState) =>
    invoice ? selectTicketById(state, invoice.ticketIds[0]) : null,
  );

  const ticketIds = invoice?.ticketIds;
  const ticketCount = ticketIds?.length || 0;
  const invoicePaymentAddress = invoice?.address || '';
  const invoicePaymentTotal = invoice?.amountBTC || 0;
  const invoicePaymentExpiry = invoice?.expiry || getTimeAsISOString();
  const hasInvoiceExpired = ticket?.status === TicketStatus.expired;
  const haveTicketsBeenConfirmed = ticket?.status === TicketStatus.confirmed;
  const haveTicketsReceivedPayment =
    ticket?.status === TicketStatus.paymentReceived;

  useLayoutEffect(
    () => {
      // on mount fetch the invoice
      dispatch(fetchInvoice.request({ lotId, invoiceId }));
    },
    // only run this once on mount
    // eslint-disable-next-line
    [],
  );

  const renderContent = useCallback(() => {
    if (loading) {
      return <ActivityIndicator size="small" />;
    }

    if (hasInvoiceExpired) {
      return (
        <Typography>
          Your ticket{ticketCount > 1 ? 's have' : ' has'} expired.
        </Typography>
      );
    }

    if (haveTicketsBeenConfirmed) {
      return (
        <Typography>
          Great success 🎉 Your payment has been confirmed and your ticket
          {ticketCount > 1 ? 's' : ''} have been entered into today's draw 🤞
        </Typography>
      );
    }

    if (haveTicketsReceivedPayment) {
      return (
        <Typography>
          We're processing your payment. Once it has received 6 confirmations on
          the blockchain, we will enter your ticket
          {ticketCount > 1 ? 's' : ''} into the draw.
        </Typography>
      );
    }

    return (
      <>
        <Typography>
          Your {maybePluralise(ticketCount, 'ticket')}{' '}
          {ticketCount > 1 ? 'are' : 'is'} reserved for
        </Typography>

        {invoicePaymentExpiry && (
          <CountdownTimer timestamp={invoicePaymentExpiry} />
        )}

        <Typography>To complete the purchase</Typography>

        <Typography bold>Pay</Typography>

        <Typography large bold>
          {invoicePaymentTotal} BTC
          <CopyIcon value={invoicePaymentTotal.toString()} />
        </Typography>

        <Typography bold>to the following address:</Typography>

        <BlockchainAddress>{invoicePaymentAddress}</BlockchainAddress>
      </>
    );
  }, [
    loading,
    hasInvoiceExpired,
    haveTicketsBeenConfirmed,
    haveTicketsReceivedPayment,
    ticketCount,
    invoicePaymentAddress,
    invoicePaymentExpiry,
    invoicePaymentTotal,
  ]);

  return (
    <Page>
      <HeaderBar showBackButton />

      <Container>
        {renderContent()}

        {!hasInvoiceExpired && <Payments lotId={lotId} invoiceId={invoiceId} />}
      </Container>
    </Page>
  );
};

const Container = styled.View``;
