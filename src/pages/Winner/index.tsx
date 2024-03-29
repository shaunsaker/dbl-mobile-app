import React, { ReactElement, useCallback } from 'react';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { CloseButton } from '../../components/CloseButton';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Typography } from '../../components/Typography';
import { useLinking } from '../../components/useLinking';
import { useSharing } from '../../components/useSharing';
import { RouteProps, Routes } from '../../router/models';
import { selectLotById } from '../../store/lots/selectors';
import { navigateBack } from '../../store/navigation/actions';
import { ApplicationState } from '../../store/reducers';
import { selectUserWinningByLotId } from '../../store/userProfile/selectors';

interface WinnerProps extends RouteProps<Routes.winner> {}

export const Winner = ({ route }: WinnerProps): ReactElement => {
  const { lotId } = route.params;

  const dispatch = useDispatch();

  const { openLink } = useLinking();

  const { share } = useSharing();

  const winning = useSelector((state: ApplicationState) =>
    selectUserWinningByLotId(state, lotId),
  );
  const lot = useSelector((state: ApplicationState) =>
    selectLotById(state, lotId),
  );

  const onWithdrawPress = useCallback(() => {
    if (!winning) {
      return;
    }

    openLink(winning.link);
  }, [openLink, winning]);

  const onSharePress = useCallback(() => {
    const title = 'I just got money fam!';
    const subject = title;
    const message = `I just won ${lot?.totalBTC} BTC with ${Config.APP_NAME}`;
    const url = Config.APP_DOWNLOAD_URL;

    share({ title, subject, message, url });
  }, [share, lot]);

  const onClosePress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  return (
    <Page>
      <Container>
        <Typography>Holy shit, you just won 🎉</Typography>

        <Typography>Follow the link below to withdraw your BTC...</Typography>

        <PrimaryButton onPress={onWithdrawPress}>
          SET UP WITHDRAWAL
        </PrimaryButton>

        <PrimaryButton onPress={onSharePress}>SHARE YOUR WIN</PrimaryButton>
      </Container>

      <CloseButtonContainer>
        <CloseButton onPress={onClosePress} />
      </CloseButtonContainer>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;

const CloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
