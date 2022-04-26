import React, { ReactElement, useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, TextInput as RNTextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { InputContainer } from '../../components/InputContainer';
import { LoadingModal } from '../../components/LoadingModal';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextButton } from '../../components/TextButton';
import { TextInput } from '../../components/TextInput';
import { Typography } from '../../components/Typography';
import { mixpanel } from '../../mixpanel';
import { Routes } from '../../router/models';
import { AnalyticsEvent } from '../../store/analytics/models';
import { resetPassword, signIn } from '../../store/auth/actions';
import { selectAuthLoading } from '../../store/auth/selectors';
import { navigate } from '../../store/navigation/actions';
import { selectUsername } from '../../store/userProfile/selectors';
import { colors } from '../../theme/colors';
import { RHYTHM } from '../../theme/rhythm';
import { validateEmail } from '../../utils/validateEmail';
import { validatePassword } from '../../utils/validatePassword';

export const SIGN_IN_EMAIL_INPUT_LABEL = 'sign in email input';
export const SIGN_IN_PASSWORD_INPUT_LABEL = 'sign in password input';
export const SIGN_IN_SUBMIT_BUTTON_LABEL = 'sign in submit button';
export const SIGN_IN_FORGOT_PASSWORD_BUTTON_LABEL =
  'sign in forgot password button';
export const SIGN_IN_SIGN_UP_BUTTON_LABEL = 'sign in sign up button';

interface SignInProps {}

export const SignIn = ({}: SignInProps): ReactElement => {
  const dispatch = useDispatch();
  const existingUsername = useSelector(selectUsername);
  const isAuthLoading = useSelector(selectAuthLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isForgotPasswordDisabled = !isEmailValid;
  const isSignInDisabled = !isEmailValid || !isPasswordValid;

  const passwordInputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    if (isAuthLoading) {
      Keyboard.dismiss();
    }
  }, [isAuthLoading]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onSubmitEmail = useCallback(() => {
    passwordInputRef.current?.focus();
  }, [passwordInputRef]);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onForgotPasswordPress = useCallback(() => {
    mixpanel.track(AnalyticsEvent.resetPassword, { email });

    dispatch(resetPassword.request({ email }));
  }, [dispatch, email]);

  const onSubmit = useCallback(() => {
    if (!isSignInDisabled) {
      mixpanel.track(AnalyticsEvent.signIn, { email });

      dispatch(signIn.request({ email, password }));
    }
  }, [dispatch, email, password, isSignInDisabled]);

  const onSignUpInsteadPress = useCallback(() => {
    dispatch(navigate({ route: Routes.signUp }));
  }, [dispatch]);

  return (
    <Page>
      <InputContainer>
        <Container>
          <StyledImage source={0} />

          <Typography large bold center>
            {`Welcome back to the Daily Bitcoin Lottery${
              existingUsername ? `, ${existingUsername}` : ''
            }`}
          </Typography>

          <Typography center>Creating one millionaire a day!</Typography>

          <TextInput
            accessibilityLabel={SIGN_IN_EMAIL_INPUT_LABEL}
            label="Email*"
            placeholder="Enter your email"
            value={email}
            autoFocus
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={onChangeEmail}
            onSubmitEditing={onSubmitEmail}
          />

          <TextInput
            accessibilityLabel={SIGN_IN_PASSWORD_INPUT_LABEL}
            ref={passwordInputRef}
            label="Password*"
            placeholder="Enter your password"
            value={password}
            secureTextEntry
            onChangeText={onChangePassword}
            onSubmitEditing={onSubmit}
          />

          <TextButton
            accessibilityLabel={SIGN_IN_FORGOT_PASSWORD_BUTTON_LABEL}
            disabled={isForgotPasswordDisabled}
            onPress={onForgotPasswordPress}
          >
            Forgot Password?
          </TextButton>

          <PrimaryButton
            accessibilityLabel={SIGN_IN_SUBMIT_BUTTON_LABEL}
            disabled={isSignInDisabled}
            onPress={onSubmit}
          >
            SIGN IN
          </PrimaryButton>

          <TextButton
            accessibilityLabel={SIGN_IN_SIGN_UP_BUTTON_LABEL}
            onPress={onSignUpInsteadPress}
          >
            Sign up instead?
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
