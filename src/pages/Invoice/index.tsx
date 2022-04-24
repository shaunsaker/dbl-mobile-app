import React, { ReactElement, useCallback, useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { BlockchainAddress } from '../../components/BlockchainAddress';
import { CopyIcon } from '../../components/CopyIcon';
import { CountdownTimer } from '../../components/CountdownTimer';
import { HeaderBar } from '../../components/HeaderBar';
import { Page } from '../../components/Page';
import { Typography } from '../../components/Typography';
import { RouteProps, Routes } from '../../router/models';
import { fetchInvoice } from '../../store/invoices/actions';
import {
  selectInvoiceById,
  selectInvoicesDataLoading,
} from '../../store/invoices/selectors';
import { ApplicationState } from '../../store/reducers';
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

  const ticketIds = invoice?.ticketIds;
  const ticketCount = ticketIds?.length || 0;
  const invoicePaymentAddress = invoice?.address || '';
  const invoicePaymentTotal = invoice?.amountBTC || 0;
  const invoicePaymentExpiry = invoice?.expiry || getTimeAsISOString();

  // get from tickets
  const hasTicketExpired = false;
  const hasTicketBeenConfirmed = false;
  const hasTicketReceivedPayment = false;

  useLayoutEffect(
    () => {
      // on mount fetch the invoice and payments
      if (!invoice) {
        dispatch(fetchInvoice.request({ lotId, invoiceId }));
      }
    },
    // only run this once on mount
    // eslint-disable-next-line
    [],
  );

  const renderContent = useCallback(() => {
    if (loading) {
      return <ActivityIndicator size="small" />;
    }

    if (hasTicketExpired) {
      return (
        <Typography>
          Your ticket{ticketCount > 1 ? 's have' : ' has'} expired.
        </Typography>
      );
    }

    if (hasTicketBeenConfirmed) {
      return (
        <Typography>
          Great success 🎉 Your payment has been confirmed and your ticket
          {ticketCount > 1 ? 's' : ''} have been entered into today's draw 🤞
        </Typography>
      );
    }

    if (hasTicketReceivedPayment) {
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
    hasTicketExpired,
    hasTicketBeenConfirmed,
    hasTicketReceivedPayment,
    ticketCount,
    invoicePaymentAddress,
    invoicePaymentExpiry,
    invoicePaymentTotal,
  ]);

  return (
    <Page>
      <HeaderBar showBackButton />

      <Container>{renderContent()}</Container>
    </Page>
  );
};

const Container = styled.View``;
