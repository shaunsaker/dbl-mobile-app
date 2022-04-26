import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SignIn,
  SIGN_IN_SUBMIT_BUTTON_LABEL,
  SIGN_IN_EMAIL_INPUT_LABEL,
  SIGN_IN_PASSWORD_INPUT_LABEL,
  SIGN_IN_FORGOT_PASSWORD_BUTTON_LABEL,
  SIGN_IN_SIGN_UP_BUTTON_LABEL,
} from '.';
import { renderComponent } from '../../testUtils/renderComponent';
import { initialState } from '../../store/reducers';
import { resetPassword, signIn } from '../../store/auth/actions';
import { Routes } from '../../router/models';
import { navigate } from '../../store/navigation/actions';

describe('SignIn', () => {
  it('disables the form by default', () => {
    const { getByLabelText, store } = renderComponent(<SignIn />, initialState);

    // press submit
    const signInButton = getByLabelText(SIGN_IN_SUBMIT_BUTTON_LABEL);
    fireEvent.press(signInButton);

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('submits the form', () => {
    const { getByLabelText, store } = renderComponent(<SignIn />, initialState);

    // add the email
    const emailInput = getByLabelText(SIGN_IN_EMAIL_INPUT_LABEL);
    const email = 'sakershaun@gmail.com';
    fireEvent.changeText(emailInput, email);

    // add the password
    const passwordInput = getByLabelText(SIGN_IN_PASSWORD_INPUT_LABEL);
    const password = '123123';
    fireEvent.changeText(passwordInput, password);

    // press submit
    const signInButton = getByLabelText(SIGN_IN_SUBMIT_BUTTON_LABEL);
    fireEvent.press(signInButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      signIn.request({ email, password }),
    );
  });

  it('resets passwords', () => {
    const { getByLabelText, store } = renderComponent(<SignIn />, initialState);

    // add the email
    const emailInput = getByLabelText(SIGN_IN_EMAIL_INPUT_LABEL);
    const email = 'sakershaun@gmail.com';
    fireEvent.changeText(emailInput, email);

    // press forgot password
    const forgotPasswordButton = getByLabelText(
      SIGN_IN_FORGOT_PASSWORD_BUTTON_LABEL,
    );
    fireEvent.press(forgotPasswordButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      resetPassword.request({ email }),
    );
  });

  it('navigates to the SignIn page', () => {
    const { getByLabelText, store } = renderComponent(<SignIn />, initialState);

    // press sign in button
    const signInButton = getByLabelText(SIGN_IN_SIGN_UP_BUTTON_LABEL);
    fireEvent.press(signInButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      navigate({ route: Routes.signUp }),
    );
  });
});
