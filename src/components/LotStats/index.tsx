import moment from 'moment';
import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components/native';
import { selectActiveLot } from '../../store/lots/selectors';
import { numberToDigits } from '../../utils/numberToDigits';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { Typography } from '../Typography';
import { useLinking } from '../useLinking';

interface LotStatsProps {}

export const LotStats = ({}: LotStatsProps): ReactElement => {
  const activeLot = useSelector(selectActiveLot);

  const { openLink } = useLinking();

  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: moment(activeLot?.drawTime).toDate(),
  });

  const onViewTransactionsPress = useCallback(() => {
    if (!activeLot) {
      // TODO: SS handle error
      return null;
    }

    openLink(
      `https://www.blockchain.com/btc/address/${activeLot.walletAddress}`,
    );
  }, [activeLot, openLink]);

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

      <Typography>{activeLot.ticketCount} Tickets Purchased</Typography>

      <CustomTouchableOpacity onPress={onViewTransactionsPress}>
        <Typography secondary underline bold>
          View Transactions on the Blockchain
        </Typography>
      </CustomTouchableOpacity>

      <Typography>
        {hours}h {minutes}min {seconds}sec to go
      </Typography>
    </Container>
  );
};

const Container = styled.View``;
