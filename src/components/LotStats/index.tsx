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
import { getFormattedTime } from '../../utils/getFormattedTime';
import { maybePluralise } from '../../utils/maybePluralise';
import { CountdownTimer } from '../CountdownTimer';
import { ShareLot } from '../ShareLot';
import { Typography } from '../Typography';

interface LotStatsProps {
  lotId: LotId;
  children?: React.ReactNode;
}

export const LotStats = ({
  lotId,
  children,
}: LotStatsProps): ReactElement | null => {
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
      <Typography large bold>
        {getFormattedTime(lot.drawTime)}
      </Typography>

      <Typography>
        Value: {lot.totalBTC} BTC ($
        {Math.round(lot.totalBTC * rate)})
      </Typography>

      <Typography>
        {maybePluralise(lot.totalConfirmedTickets, 'Ticket')} Purchased
      </Typography>

      {lot && lot.active && <CountdownTimer timestamp={lot.drawTime} />}

      {lot.winnerUsername && (
        <>
          <Typography>Winner</Typography>

          <Typography large bold>
            {lot.winnerUsername}
          </Typography>
        </>
      )}

      {loading && (
        <ActivityIndicatorContainer>
          <ActivityIndicator size="small" />
        </ActivityIndicatorContainer>
      )}

      <ShareLotContainer>
        <ShareLot lotId={lotId} />
      </ShareLotContainer>

      {children}
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

const ShareLotContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;
