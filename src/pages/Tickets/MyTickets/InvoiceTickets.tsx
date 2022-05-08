import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../../router/models';
import { LotId } from '../../../store/lots/models';
import { navigate } from '../../../store/navigation/actions';
import { getFormattedTime } from '../../../utils/getFormattedTime';
import { CustomTouchableOpacity } from '../../../components/CustomTouchableOpacity';
import { Typography } from '../../../components/Typography';
import { Invoice } from '../../../store/invoices/models';

interface InvoiceTicketsProps extends Invoice {
  lotId: LotId;
}

export const InvoiceTickets = ({
  lotId,
  id,
  dateCreated,
  amountBTC,
  status,
  ticketIds,
}: InvoiceTicketsProps): ReactElement => {
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    dispatch(
      navigate({
        route: Routes.invoice,
        props: {
          lotId,
          invoiceId: id,
        },
      }),
    );
  }, [dispatch, lotId, id]);

  return (
    <Container onPress={onPress}>
      <Typography large>{getFormattedTime(dateCreated)}</Typography>

      <Typography>TOTAL</Typography>

      <Typography bold>{amountBTC} BTC</Typography>

      <Typography>STATUS</Typography>

      <Typography bold>{status}</Typography>

      <Typography>NO OF TICKETS</Typography>

      <Typography bold>{ticketIds.length}</Typography>
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)`
  border-width: 1px;
`;
