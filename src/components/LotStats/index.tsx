import React, { ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Currency } from '../../store/btcRate/models';
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors';
import {
  selectActiveLot,
  selectLotsDataLoading,
} from '../../store/lots/selectors';
import { ApplicationState } from '../../store/reducers';
import { CountdownTimer } from '../CountdownTimer';
import { Typography } from '../Typography';

interface LotStatsProps {}

export const LotStats = ({}: LotStatsProps): ReactElement => {
  const activeLot = useSelector(selectActiveLot);
  const loading = useSelector(selectLotsDataLoading);

  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  );

  if (!activeLot) {
    return (
      <Container>
        <Typography>
          Well this is embarrasing, we have no active lots 🤔
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography bold>Lot Stats</Typography>

      <Typography>
        Value: {activeLot.totalBTC} BTC ($
        {Math.round(activeLot.totalBTC * rate)})
      </Typography>

      <Typography>
        {activeLot.totalConfirmedTickets} Tickets Purchased
      </Typography>

      {activeLot && <CountdownTimer timestamp={activeLot.drawTime} />}

      {loading && (
        <ActivityIndicatorContainer>
          <ActivityIndicator size="small" />
        </ActivityIndicatorContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  border-width: 1px;
`;

const ActivityIndicatorContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
