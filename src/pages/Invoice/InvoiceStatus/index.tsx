import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { CountdownTimer } from '../../../components/CountdownTimer';
import { Typography } from '../../../components/Typography';
import { InvoiceId } from '../../../store/invoices/models';
import { selectInvoiceById } from '../../../store/invoices/selectors';
import { ApplicationState } from '../../../store/reducers';
import { TicketStatus } from '../../../store/tickets/models';
import { selectTicketById } from '../../../store/tickets/selectors';
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
  const ticketId = invoice?.ticketIds[0];
  const ticket = useSelector((state: ApplicationState) =>
    ticketId ? selectTicketById(state, ticketId) : null,
  );
  const ticketStatus = ticket?.status;

  const renderStatusText = useCallback(() => {
    const ticketCount = invoice?.ticketIds.length || 0;
    const ticketText = maybePluralise(ticketCount, 'ticket');
    const areIsText = ticketCount > 1 ? 'are' : 'is';

    if (ticketStatus === TicketStatus.reserved) {
      return `Your ${ticketText} ${areIsText} reserved for`;
    }

    if (ticketStatus === TicketStatus.paymentReceived) {
      return `We received payment for your ${ticketText} and ${areIsText} confirming them on the blockchain.`;
    }

    if (ticketStatus === TicketStatus.confirmed) {
      return `We confirmed your payment(s). Your ${ticketText} ${areIsText} in the draw.`;
    }

    if (ticketStatus === TicketStatus.expired) {
      return `Your ${ticketText} ${ticketCount > 1 ? 'have' : 'has'} expired.`;
    }
  }, [ticketStatus, invoice]);

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
