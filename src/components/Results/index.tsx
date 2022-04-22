import moment from 'moment';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { selectLatestInactiveLot } from '../../store/lots/selectors';
import { numberToDigits } from '../../utils/numberToDigits';
import { Typography } from '../Typography';
import { useBTCUSDRate } from '../useBTCUSDRate';

interface ResultsProps {}

export const Results = ({}: ResultsProps): ReactElement | null => {
  const latestInactiveLot = useSelector(selectLatestInactiveLot);

  const rate = useBTCUSDRate();

  if (!latestInactiveLot) {
    return null;
  }

  return (
    <Container>
      <Typography bold>Yesterday's Results</Typography>

      <Typography>
        {moment(latestInactiveLot?.dateCreated).format('dddd, DD MMMM YYYY')}
      </Typography>

      <Typography large bold>
        {latestInactiveLot?.winnerUsername}
      </Typography>

      <Typography bold>
        {latestInactiveLot?.totalBTC} BTC ($
        {numberToDigits(latestInactiveLot?.totalBTC * rate, 0)})
      </Typography>
    </Container>
  );
};

const Container = styled.View`
  border-width: 1px;
`;
