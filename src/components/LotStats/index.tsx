import React, { ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Currency } from '../../store/btcRate/models';
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors';
import { LotId } from '../../store/lots/models';
import {
  selectLotById,
  selectLotsDataLoading,
} from '../../store/lots/selectors';
import { ApplicationState } from '../../store/reducers';
import { maybePluralise } from '../../utils/maybePluralise';
import { CountdownTimer } from '../CountdownTimer';
import { Typography } from '../Typography';

interface LotStatsProps {
  lotId: LotId;
}

export const LotStats = ({ lotId }: LotStatsProps): ReactElement | null => {
  const loading = useSelector(selectLotsDataLoading);
  const lot = useSelector((state: ApplicationState) =>
    selectLotById(state, lotId),
  );

  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  );

  if (!lot) {
    return null;
  }

  return (
    <Container>
      <Typography bold>Lot Stats</Typography>

      <Typography>
        Value: {lot.totalBTC} BTC ($
        {Math.round(lot.totalBTC * rate)})
      </Typography>

      <Typography>
        {maybePluralise(lot.totalConfirmedTickets, 'Ticket')} Purchased
      </Typography>

      {lot && <CountdownTimer timestamp={lot.drawTime} />}

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
