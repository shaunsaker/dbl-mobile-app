import moment from 'moment';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Currency } from '../../store/btcRate/models';
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors';
import { LotId } from '../../store/lots/models';
import { selectLotById } from '../../store/lots/selectors';
import { ApplicationState } from '../../store/reducers';
import { numberToDigits } from '../../utils/numberToDigits';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { Typography } from '../Typography';

interface LotResultProps {
  lotId: LotId;
  onPress?: () => void;
}

export const LotResult = ({
  lotId,
  onPress,
}: LotResultProps): ReactElement | null => {
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
    <Container disabled={!onPress} onPress={onPress}>
      <Typography>
        {moment(lot.drawTime).format('dddd, DD MMMM YYYY')}
      </Typography>

      <Typography large bold>
        {lot.winnerUsername}
      </Typography>

      <Typography bold>
        {lot.totalBTC} BTC ($
        {numberToDigits(lot?.totalBTC * rate, 0)})
      </Typography>
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)`
  border-width: 1px;
`;
