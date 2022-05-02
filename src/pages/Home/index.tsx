import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { LotStats } from '../../components/LotStats';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ShareLot } from '../../components/ShareLot';
import { TicketsSummary } from '../../components/TicketsSummary';
import { Routes } from '../../router/models';
import { selectActiveLotId } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { ApplicationState } from '../../store/reducers';
import { selectTicketsByLotId } from '../../store/tickets/selectors';
import { YesterdaysResults } from './YesterdaysResults';

interface HomeProps {}

export const Home = ({}: HomeProps): ReactElement => {
  const dispatch = useDispatch();

  const activeLotId = useSelector(selectActiveLotId) || '';
  const tickets = useSelector((state: ApplicationState) =>
    selectTicketsByLotId(state, activeLotId),
  );

  const hasTickets = tickets.length;

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

        <ShareLotContainer>
          <ShareLot lotId={activeLotId} />
        </ShareLotContainer>
      </Container>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ShareLotContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;
