import moment from 'moment';
import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { Lot } from '../../store/lots/models';
import { numberToDigits } from '../../utils/numberToDigits';
import { Typography } from '../Typography';
import { useBTCUSDRate } from '../useBTCUSDRate';

interface LotResultProps {
  lot: Lot;
}

export const LotResult = ({ lot }: LotResultProps): ReactElement | null => {
  const rate = useBTCUSDRate();

  if (!lot) {
    return null;
  }

  return (
    <Container>
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

const Container = styled.View`
  border-width: 1px;
`;
