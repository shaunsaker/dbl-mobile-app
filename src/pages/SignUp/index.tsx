import React, { ReactElement, useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, TextInput as RNTextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { InputContainer } from '../../components/InputContainer';
import { LoadingModal } from '../../components/LoadingModal';
import { Page } from '../../components/Page';
import { PasswordTextInput } from '../../components/PasswordTextInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextButton } from '../../components/TextButton';
import { TextInput } from '../../components/TextInput';
import { Typography } from '../../components/Typography';
import { Routes } from '../../router/models';
import { signUp } from '../../store/auth/actions';
import { selectAuthLoading } from '../../store/auth/selectors';
import { navigate } from '../../store/navigation/actions';
import { colors } from '../../theme/colors';
import { RHYTHM } from '../../theme/rhythm';
import { validateEmail } from '../../utils/validateEmail';
import { validatePassword } from '../../utils/validatePassword';

// accessibility labels used for tests
export const SIGN_UP_USERNAME_INPUT_LABEL = 'sign up username input';
export const SIGN_UP_EMAIL_INPUT_LABEL = 'sign up email input';
export const SIGN_UP_PASSWORD_INPUT_LABEL = 'sign up password input';
export const SIGN_UP_SUBMIT_BUTTON_LABEL = 'sign up submit button';
export const SIGN_UP_FORGOT_PASSWORD_BUTTON_LABEL =
  'sign up forgot password button';
export const SIGN_UP_SIGN_IN_BUTTON_LABEL = 'sign up sign in button';

interface SignUpProps {}

// FIXME: could reuse SignIn
export const SignUp = ({}: SignUpProps): ReactElement => {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector(selectAuthLoading);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isUsernameValid = username.length > 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isSignUpDisabled =
    !isUsernameValid || !isEmailValid || !isPasswordValid;

  const emailInputRef = useRef<RNTextInput>(null);
  const passwordInputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    if (isAuthLoading) {
      Keyboard.dismiss();
    }
  }, [isAuthLoading]);

  const onChangeUsername = useCallback((text: string) => {
    setUsername(text);
  }, []);

  const onSubmitUsername = useCallback(() => {
    emailInputRef.current?.focus();
  }, [emailInputRef]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onSubmitEmail = useCallback(() => {
    passwordInputRef.current?.focus();
  }, [passwordInputRef]);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onSubmit = useCallback(() => {
    if (!isSignUpDisabled) {
      dispatch(signUp.request({ username, email, password }));
    }
  }, [dispatch, username, email, password, isSignUpDisabled]);

  const onSignInInsteadPress = useCallback(() => {
    dispatch(navigate({ route: Routes.signIn }));
  }, [dispatch]);

  return (
    <Page>
      <InputContainer>
        <Container>
          <StyledImage source={0} />

          <Typography large bold center>
            Welcome to the Daily Bitcoin Lottery
          </Typography>

          <Typography center>Creating one millionaire a day!</Typography>

          <TextInput
            accessibilityLabel={SIGN_UP_EMAIL_INPUT_LABEL}
            ref={emailInputRef}
            label="Email*"
            placeholder="Enter your email"
            value={email}
            blurOnSubmit={false}
            onChangeText={onChangeEmail}
            onSubmitEditing={onSubmitEmail}
          />

          <TextInput
            accessibilityLabel={SIGN_UP_USERNAME_INPUT_LABEL}
            label="What should we call you?*"
            placeholder="E.g. Nighthawk, Sandra, Xolisi, Kobus"
            value={username}
            autoFocus
            blurOnSubmit={false}
            onChangeText={onChangeUsername}
            onSubmitEditing={onSubmitUsername}
          />

          <PasswordTextInput
            accessibilityLabel={SIGN_UP_PASSWORD_INPUT_LABEL}
            ref={passwordInputRef}
            label="Password*"
            placeholder="Enter your password"
            value={password}
            onChangeText={onChangePassword}
            onSubmitEditing={onSubmit}
          />

          <PrimaryButton
            accessibilityLabel={SIGN_UP_SUBMIT_BUTTON_LABEL}
            disabled={isSignUpDisabled}
            onPress={onSubmit}
          >
            SIGN UP
          </PrimaryButton>

          <TextButton
            accessibilityLabel={SIGN_UP_SIGN_IN_BUTTON_LABEL}
            onPress={onSignInInsteadPress}
          >
            Sign in instead?
          </TextButton>
        </Container>
      </InputContainer>

      {isAuthLoading && <LoadingModal />}
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${RHYTHM}px;
`;

const StyledImage = styled.Image`
  width: 120px;
  height: 120px;
  background-color: ${colors.border};
  align-self: center;
`;
