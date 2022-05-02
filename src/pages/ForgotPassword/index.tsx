import React, { ReactElement, useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { BackButton } from '../../components/BackButton';
import { InputContainer } from '../../components/InputContainer';
import { LoadingModal } from '../../components/LoadingModal';
import { Page } from '../../components/Page';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInput } from '../../components/TextInput';
import { Typography } from '../../components/Typography';
import { RouteProps, Routes } from '../../router/models';
import { resetPassword } from '../../store/auth/actions';
import { selectAuthLoading } from '../../store/auth/selectors';
import { navigateBack } from '../../store/navigation/actions';
import { colors } from '../../theme/colors';
import { RHYTHM } from '../../theme/rhythm';
import { validateEmail } from '../../utils/validateEmail';

interface ForgotPasswordProps extends RouteProps<Routes.forgotPassword> {}

export const ForgotPassword = ({
  route,
}: ForgotPasswordProps): ReactElement => {
  const dispatch = useDispatch();

  const { email: initialEmail } = route.params;

  const isAuthLoading = useSelector(selectAuthLoading);

  const [email, setEmail] = useState(initialEmail);

  const isEmailValid = validateEmail(email);
  const isForgotPasswordDisabled = !isEmailValid;

  useEffect(() => {
    if (isAuthLoading) {
      Keyboard.dismiss();
    }
  }, [isAuthLoading]);

  const onBackPress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onSubmitPress = useCallback(() => {
    dispatch(resetPassword.request({ email }));
  }, [dispatch, email]);

  return (
    <Page>
      <InputContainer>
        <Container>
          <StyledImage source={0} />

          <Typography large bold center>
            Title
          </Typography>

          <Typography center>Creating one millionaire a day!</Typography>

          <TextInput
            label="Email*"
            placeholder="Enter your email"
            value={email}
            autoFocus
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={onChangeEmail}
            onSubmitEditing={onSubmitPress}
          />

          <PrimaryButton
            disabled={isForgotPasswordDisabled}
            onPress={onSubmitPress}
          >
            SUBMIT
          </PrimaryButton>
        </Container>
      </InputContainer>

      <BackButtonContainer>
        <BackButton onPress={onBackPress} />
      </BackButtonContainer>

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

const BackButtonContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
`;
