import moment from 'moment';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Currency } from '../../store/btcRate/models';
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors';
import { Lot } from '../../store/lots/models';
import { ApplicationState } from '../../store/reducers';
import { numberToDigits } from '../../utils/numberToDigits';
import { Typography } from '../Typography';

interface LotResultProps {
  lot: Lot;
}

export const LotResult = ({ lot }: LotResultProps): ReactElement | null => {
  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  );

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
