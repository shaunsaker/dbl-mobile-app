import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Typography } from '../../components/Typography';
import { useLinking } from '../../components/useLinking';
import { RouteProps, Routes } from '../../router/models';
import { ApplicationState } from '../../store/reducers';
import { selectUserWinningByLotId } from '../../store/userProfile/selectors';
import { TestimonialInput } from './TestimonialInput';

interface WinnerProps extends RouteProps<Routes.winner> {}

export const Winner = ({ route }: WinnerProps): ReactElement => {
  const { lotId } = route.params;

  const { openLink } = useLinking();

  const winning = useSelector((state: ApplicationState) =>
    selectUserWinningByLotId(state, lotId),
  );

  const onWithdrawPress = useCallback(() => {
    if (!winning) {
      return;
    }

    openLink(winning.link);
  }, [openLink, winning]);

  return (
    <Page>
      <HeaderBar showBackButton />

      <Container>
        <Typography>Holy shit, you just won 🎉</Typography>

        <Typography>Follow the link below to withdraw your BTC...</Typography>

        <PrimaryButton onPress={onWithdrawPress}>
          SET UP WITHDRAWAL
        </PrimaryButton>

        <TestimonialInput lotId={lotId} />
      </Container>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;
