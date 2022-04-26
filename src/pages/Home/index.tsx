import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { LotStats } from '../../components/LotStats';
import { MyTickets } from '../../components/MyTickets';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ShareLot } from '../../components/ShareLot';
import { Routes } from '../../router/models';
import { selectActiveLotId } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { YesterdaysResults } from './YesterdaysResults';

interface HomeProps {}

export const Home = ({}: HomeProps): ReactElement => {
  const dispatch = useDispatch();

  const activeLotId = useSelector(selectActiveLotId) || '';

  const onBuyTicketsPress = useCallback(() => {
    dispatch(navigate({ route: Routes.reserveTickets }));
  }, [dispatch]);

  return (
    <Page>
      <HeaderBar />

      <Container>
        <YesterdaysResults />

        <LotStats lotId={activeLotId} />

        <MyTickets lotId={activeLotId} />

        <PrimaryButton onPress={onBuyTicketsPress}>BUY TICKETS</PrimaryButton>

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
