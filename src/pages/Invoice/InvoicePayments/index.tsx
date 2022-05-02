import React, { ReactElement, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { InvoiceId } from '../../../store/invoices/models';
import { LotId } from '../../../store/lots/models';
import { fetchPayments } from '../../../store/payments/actions';
import { selectPaymentsByInvoiceId } from '../../../store/payments/selectors';
import { ApplicationState } from '../../../store/reducers';
import { Typography } from '../../../components/Typography';
import { Payment } from './Payment';

interface InvoicePaymentsProps {
  lotId: LotId;
  invoiceId: InvoiceId;
}

export const InvoicePayments = ({
  lotId,
  invoiceId,
}: InvoicePaymentsProps): ReactElement => {
  const dispatch = useDispatch();

  const payments = useSelector((state: ApplicationState) =>
    selectPaymentsByInvoiceId(state, invoiceId),
  );

  useLayoutEffect(
    () => {
      // on mount fetch the payments
      dispatch(fetchPayments.request({ lotId, invoiceId }));
    },
    // only run this once on mount
    // eslint-disable-next-line
    [],
  );

  return (
    <Container>
      <Typography bold>Payments</Typography>

      {payments && payments.length ? (
        payments.map(payment => <Payment key={payment.id} {...payment} />)
      ) : (
        <Typography>Waiting for payments...</Typography>
      )}
    </Container>
  );
};

const Container = styled.View``;
