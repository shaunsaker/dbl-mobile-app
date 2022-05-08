import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { CloseButton } from '../../components/CloseButton';
import { Page } from '../../components/Page';
import { InvoicePayments } from './InvoicePayments';
import { RouteProps, Routes } from '../../router/models';
import { navigateBack } from '../../store/navigation/actions';
import { InvoiceDetails } from './InvoiceDetails';
import { InvoiceStatus } from './InvoiceStatus';

interface InvoiceProps extends RouteProps<Routes.invoice> {}

export const Invoice = ({ route }: InvoiceProps): ReactElement => {
  const dispatch = useDispatch();

  const { lotId, invoiceId } = route.params;

  const onClosePress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  return (
    <Page>
      <Container>
        <InvoiceStatus invoiceId={invoiceId} />

        <InvoiceDetails invoiceId={invoiceId} />

        <InvoicePayments lotId={lotId} invoiceId={invoiceId} />
      </Container>

      <CloseButtonContainer>
        <CloseButton onPress={onClosePress} />
      </CloseButtonContainer>
    </Page>
  );
};

const Container = styled.View``;

const CloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
