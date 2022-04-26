import React, { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
import { InputContainer } from '../../components/InputContainer';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextButton } from '../../components/TextButton';
import { TextInput } from '../../components/TextInput';
import { Typography } from '../../components/Typography';
import { mixpanel } from '../../mixpanel';
import { AnalyticsEvent } from '../../store/analytics/models';
import { signOut } from '../../store/auth/actions';
import { updateUserProfile } from '../../store/userProfile/actions';
import {
  selectUserEmail,
  selectUsername,
} from '../../store/userProfile/selectors';
import { RHYTHM } from '../../theme/rhythm';

interface ProfileProps {}

export const Profile = ({}: ProfileProps): ReactElement => {
  const dispatch = useDispatch();

  const savedUsername = useSelector(selectUsername);
  const userEmail = useSelector(selectUserEmail);

  const [username, setUsername] = useState(savedUsername || '');

  const isUsernameValid = username.length;
  const usernameChanged = username !== savedUsername;
  const isSaveDisabled = !(usernameChanged && isUsernameValid);

  const onChangeUsername = useCallback((text: string) => {
    setUsername(text);
  }, []);

  const onSignOutPress = useCallback(() => {
    mixpanel.track(AnalyticsEvent.signOut, { email: userEmail });

    dispatch(signOut.request());
  }, [dispatch, userEmail]);

  const onSubmit = useCallback(() => {
    dispatch(updateUserProfile.request({ username }));
  }, [dispatch, username]);

  return (
    <Page>
      <HeaderBar />

      <InputContainer>
        <Container>
          <Typography>Email</Typography>

          <Typography bold>{userEmail}</Typography>

          <TextInput
            label="What should we call you?"
            placeholder="E.g. Nighthawk"
            value={username}
            onChangeText={onChangeUsername}
            onSubmitEditing={!isSaveDisabled ? onSubmit : undefined}
          />

          <TextButton onPress={onSignOutPress}>Sign Out</TextButton>

          <ButtonsContainer>
            <PrimaryButton disabled={isSaveDisabled} onPress={onSubmit}>
              SAVE
            </PrimaryButton>
          </ButtonsContainer>
        </Container>
      </InputContainer>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
  padding: ${RHYTHM}px;
`;

const ButtonsContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
