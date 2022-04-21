import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { LotStats } from '../../components/LotStats';
import { MyTickets } from '../../components/MyTickets';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Results } from '../../components/Results';
import { Typography } from '../../components/Typography';
import { Routes } from '../../router/models';
import { selectActiveLotId } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';

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
        <Typography bold>Home Page</Typography>

        <Results />

        <LotStats />

        <MyTickets lotId={activeLotId} />

        <PrimaryButton onPress={onBuyTicketsPress}>BUY TICKETS</PrimaryButton>
      </Container>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;
