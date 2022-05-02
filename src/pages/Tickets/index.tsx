import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { CloseButton } from '../../components/CloseButton';
import { MyTickets } from './MyTickets';
import { Page } from '../../components/Page';
import { RouteProps, Routes } from '../../router/models';
import { navigateBack } from '../../store/navigation/actions';

interface TicketsProps extends RouteProps<Routes.tickets> {}

export const Tickets = ({ route }: TicketsProps): ReactElement => {
  const { lotId } = route.params;

  const dispatch = useDispatch();

  const onClosePress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  return (
    <Page>
      <Container>
        <MyTickets lotId={lotId} />
      </Container>

      <CloseButtonContainer>
        <CloseButton onPress={onClosePress} />
      </CloseButtonContainer>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;

const CloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
