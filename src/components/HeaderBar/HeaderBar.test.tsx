import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { HeaderBar, HEADER_BAR_BACK_BUTTON_LABEL } from '.';
import { navigateBack } from '../../store/navigation/actions';
import { renderComponent } from '../../testUtils/renderComponent';

describe('HeaderBar', () => {
  it('closes when showBackButton is true', () => {
    const { getByLabelText, store } = renderComponent(
      <HeaderBar showBackButton />,
    );

    // press the close button
    const button = getByLabelText(HEADER_BAR_BACK_BUTTON_LABEL);
    fireEvent.press(button);

    expect(store.dispatch).toHaveBeenCalledWith(navigateBack());
  });
});
