import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { LotStats } from '../../components/LotStats';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TicketsSummary } from '../../components/TicketsSummary';
import { Routes } from '../../router/models';
import { selectHasTicketsForLotId } from '../../store/invoices/selectors';
import { selectActiveLotId } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { ApplicationState } from '../../store/reducers';
import { YesterdaysResults } from './YesterdaysResults';

interface HomeProps {}

export const Home = ({}: HomeProps): ReactElement => {
  const dispatch = useDispatch();

  const activeLotId = useSelector(selectActiveLotId) || '';

  const hasTickets = useSelector((state: ApplicationState) =>
    selectHasTicketsForLotId(state, activeLotId),
  );

  const onBuyTicketsPress = useCallback(() => {
    dispatch(navigate({ route: Routes.reserveTickets }));
  }, [dispatch]);

  return (
    <Page>
      <HeaderBar />

      <Container>
        <YesterdaysResults />

        <LotStats lotId={activeLotId} />

        <PrimaryButton onPress={onBuyTicketsPress}>BUY TICKETS</PrimaryButton>

        {hasTickets ? <TicketsSummary lotId={activeLotId} /> : null}
      </Container>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;
