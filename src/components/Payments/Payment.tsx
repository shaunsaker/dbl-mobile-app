import React, { ReactElement, useCallback } from 'react';
import Config from 'react-native-config';
import styled from 'styled-components/native';
import { Payment as PaymentType } from '../../store/payments/models';
import { getFormattedTime } from '../../utils/getFormattedTime';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { Typography } from '../Typography';
import { useLinking } from '../useLinking';
import OpenIcon from '../../icons/open.svg';

interface PaymentProps extends PaymentType {}

export const Payment = ({
  txId,
  amountBTC,
  receivedDate,
}: PaymentProps): ReactElement => {
  const { openLink } = useLinking();

  const onPress = useCallback(() => {
    const url = `${Config.BLOCKCHAIN_EXPLORER_URL}/${txId}`;

    openLink(url);
  }, [openLink, txId]);

  return (
    <Container onPress={onPress}>
      <Typography>{getFormattedTime(receivedDate)}</Typography>

      <Typography>{amountBTC} BTC</Typography>

      <OpenIcon width={16} height={16} style={{}} />
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
`;
