import moment from 'moment';
import React, { ReactElement } from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components/native';
import { Typography } from './Typography';

interface TimerProps {
  timestamp: string;
}

export const CountdownTimer = ({ timestamp }: TimerProps): ReactElement => {
  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: moment(timestamp).toDate(),
  });

  return (
    <Container>
      <Typography>
        {hours}h {minutes}min {seconds}sec to go
      </Typography>
    </Container>
  );
};

const Container = styled.View``;
