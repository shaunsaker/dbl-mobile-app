import React, { ReactElement, useCallback } from 'react';
import styled from 'styled-components/native';
import { LotId } from '../../store/lots/models';
import ShareIcon from '../../icons/share.svg';
import { colors } from '../../theme/colors';
import { getTicketOdds } from '../../utils/getTicketOdds';
import { useSharing } from '../useSharing';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { selectLotById } from '../../store/lots/selectors';
import { ActionButton } from '../ActionButton';
import { maybePluralise } from '../../utils/maybePluralise';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';

interface ShareLotProps {
  lotId: LotId;
}

export const ShareLot = ({ lotId }: ShareLotProps): ReactElement => {
  const lot = useSelector((state: ApplicationState) =>
    selectLotById(state, lotId),
  );

  const { share } = useSharing();

  const onPress = useCallback(() => {
    const title = 'Get money fam!';
    const subject = title;
    const ticketOdds = getTicketOdds({
      newUserTicketCount: 1,
      existingUserTicketCount: 0,
      totalLotTicketCount: lot?.totalConfirmedTickets || 0,
    });
    const url = Config.APP_DOWNLOAD_URL;

    // FIXME: this is gross, abstract and test it
    const isLotActive = lot?.active;
    const message = `Lot total ${isLotActive ? 'is' : 'was'} at ${
      lot?.totalBTC
    } BTC and ${maybePluralise(lot?.totalConfirmedTickets || 0, 'ticket')} ${
      isLotActive ? 'has been' : 'was'
    } purchased. Your odds of winning would ${
      isLotActive ? 'be' : 'have been'
    } ${ticketOdds}%!`;

    share({ title, subject, message, url });
  }, [share, lot]);

  return (
    <Container onPress={onPress}>
      <ShareIcon width={24} height={24} fill={colors.primaryText} />
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)``;
