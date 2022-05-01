import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { CloseButton } from '../../components/CloseButton';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Typography } from '../../components/Typography';
import { Routes } from '../../router/models';
import { navigate } from '../../store/navigation/actions';
import { setHasCompletedOnboarding } from '../../store/onboarding/actions';

interface WelcomeProps {}

export const Welcome = ({}: WelcomeProps): ReactElement => {
  const dispatch = useDispatch();

  const onLearnMorePress = useCallback(() => {
    dispatch(navigate({ route: Routes.onboarding }));
  }, [dispatch]);

  const onClosePress = useCallback(() => {
    dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }));
  }, [dispatch]);

  return (
    <Page>
      <Container>
        <Typography large bold>
          Welcome
        </Typography>

        <Typography>
          This is a gravity-defying explanation that welcomes the user and gets
          them excited and eager to buy their first tickets.
        </Typography>

        <PrimaryButton onPress={onLearnMorePress}>LEARN MORE</PrimaryButton>
      </Container>

      <CloseButtonContainer>
        <CloseButton onPress={onClosePress} />
      </CloseButtonContainer>
    </Page>
  );
};

const Container = styled.View``;

const CloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
