import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SignUp,
  SIGN_UP_SUBMIT_BUTTON_LABEL,
  SIGN_UP_EMAIL_INPUT_LABEL,
  SIGN_UP_PASSWORD_INPUT_LABEL,
  SIGN_UP_USERNAME_INPUT_LABEL,
  SIGN_UP_FORGOT_PASSWORD_BUTTON_LABEL,
  SIGN_UP_SIGN_IN_BUTTON_LABEL,
} from '.';
import { renderComponent } from '../../testUtils/renderComponent';
import { initialState } from '../../store/reducers';
import { resetPassword, signUp } from '../../store/auth/actions';
import { mixpanel } from '../../mixpanel';
import { AnalyticsEvent } from '../../store/analytics/models';
import { Routes } from '../../router/models';
import { navigate } from '../../store/navigation/actions';

describe('SignUp', () => {
  it('disables the form by default', () => {
    const { getByLabelText, store } = renderComponent(<SignUp />, initialState);

    // press submit
    const signUpButton = getByLabelText(SIGN_UP_SUBMIT_BUTTON_LABEL);
    fireEvent.press(signUpButton);

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('submits the form', () => {
    const { getByLabelText, store } = renderComponent(<SignUp />, initialState);

    // add a username
    const usernameInput = getByLabelText(SIGN_UP_USERNAME_INPUT_LABEL);
    const username = 'sakerbos';
    fireEvent.changeText(usernameInput, username);

    // add the email
    const emailInput = getByLabelText(SIGN_UP_EMAIL_INPUT_LABEL);
    const email = 'sakershaun@gmail.com';
    fireEvent.changeText(emailInput, email);

    // add the password
    const passwordInput = getByLabelText(SIGN_UP_PASSWORD_INPUT_LABEL);
    const password = '123123';
    fireEvent.changeText(passwordInput, password);

    // press submit
    const signUpButton = getByLabelText(SIGN_UP_SUBMIT_BUTTON_LABEL);
    fireEvent.press(signUpButton);

    expect(mixpanel.track).toHaveBeenCalledWith(AnalyticsEvent.signUp, {
      email,
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      signUp.request({ username, email, password }),
    );
  });

  it('resets passwords', () => {
    const { getByLabelText, store } = renderComponent(<SignUp />, initialState);

    // add the email
    const emailInput = getByLabelText(SIGN_UP_EMAIL_INPUT_LABEL);
    const email = 'sakershaun@gmail.com';
    fireEvent.changeText(emailInput, email);

    // press forgot password
    const forgotPasswordButton = getByLabelText(
      SIGN_UP_FORGOT_PASSWORD_BUTTON_LABEL,
    );
    fireEvent.press(forgotPasswordButton);

    expect(mixpanel.track).toHaveBeenCalledWith(AnalyticsEvent.resetPassword, {
      email,
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      resetPassword.request({ email }),
    );
  });

  it('navigates to the SignIn page', () => {
    const { getByLabelText, store } = renderComponent(<SignUp />, initialState);

    // press sign in button
    const signInButton = getByLabelText(SIGN_UP_SIGN_IN_BUTTON_LABEL);
    fireEvent.press(signInButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      navigate({ route: Routes.signIn }),
    );
  });
});
