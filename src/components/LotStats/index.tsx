import moment from 'moment';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components/native';
import { selectActiveLot } from '../../store/lots/selectors';
import { numberToDigits } from '../../utils/numberToDigits';
import { Typography } from '../Typography';

interface LotStatsProps {}

export const LotStats = ({}: LotStatsProps): ReactElement => {
  const activeLot = useSelector(selectActiveLot);

  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: moment(activeLot?.drawTime).toDate(),
  });

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
      <Typography>Lot Stats</Typography>

      <Typography bold>
        Value: {activeLot.totalInBTC} BTC ($
        {numberToDigits(activeLot.totalInBTC * activeLot.BTCPriceInUSD)})
      </Typography>

      <Typography>
        {activeLot.confirmedTicketCount} Tickets Purchased
      </Typography>

      <Typography>
        {hours}h {minutes}min {seconds}sec to go
      </Typography>
    </Container>
  );
};

const Container = styled.View``;
