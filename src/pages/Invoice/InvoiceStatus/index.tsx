import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { CountdownTimer } from '../../../components/CountdownTimer';
import { Typography } from '../../../components/Typography';
import {
  InvoiceId,
  InvoiceStatus as InvoiceStatusType,
} from '../../../store/invoices/models';
import { selectInvoiceById } from '../../../store/invoices/selectors';
import { ApplicationState } from '../../../store/reducers';
import { maybePluralise } from '../../../utils/maybePluralise';

interface InvoiceStatusProps {
  invoiceId: InvoiceId;
}

export const InvoiceStatus = ({
  invoiceId,
}: InvoiceStatusProps): ReactElement | null => {
  const invoice = useSelector((state: ApplicationState) =>
    selectInvoiceById(state, invoiceId),
  );

  const renderStatusText = useCallback(() => {
    const ticketCount = invoice?.ticketIds.length || 0;
    const ticketText = maybePluralise(ticketCount, 'ticket');
    const areIsText = ticketCount > 1 ? 'are' : 'is';

    if (invoice?.status === InvoiceStatusType.reserved) {
      return `Your ${ticketText} ${areIsText} reserved for`;
    }

    if (invoice?.status === InvoiceStatusType.paymentReceived) {
      return `We received payment for your ${ticketText} and ${areIsText} confirming them on the blockchain.`;
    }

    if (invoice?.status === InvoiceStatusType.confirmed) {
      return `We confirmed your payment(s). Your ${ticketText} ${areIsText} in the draw.`;
    }

    if (invoice?.status === InvoiceStatusType.expired) {
      return `Your ${ticketText} ${ticketCount > 1 ? 'have' : 'has'} expired.`;
    }
  }, [invoice]);

  if (!invoice) {
    return null;
  }

  return (
    <Container>
      <Typography>{renderStatusText()}</Typography>

      <CountdownTimer timestamp={invoice.expiry} />
    </Container>
  );
};

const Container = styled.View`
  background-color: lightgray;
`;
