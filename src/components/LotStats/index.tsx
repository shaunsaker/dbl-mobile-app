import moment from 'moment';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components/native';
import { selectActiveLot } from '../../store/lots/selectors';
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
      <Typography bold>Lot Stats</Typography>

      <Typography>Value: {activeLot.totalBTC} BTC</Typography>

      <Typography>
        {activeLot.totalConfirmedTickets} Tickets Purchased
      </Typography>

      <Typography>
        {hours}h {minutes}min {seconds}sec to go
      </Typography>
    </Container>
  );
};

const Container = styled.View`
  border-width: 1px;
`;
