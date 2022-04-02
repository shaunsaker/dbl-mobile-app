import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Modal } from '../../components/Modal';
import { PrimaryButton } from '../../components/PrimaryButton';
import { signOut } from '../../store/auth/actions';
import { navigateBack } from '../../store/navigation/actions';

interface QuitOnboardingModalProps {}

export const QuitOnboardingModal =
  ({}: QuitOnboardingModalProps): ReactElement | null => {
    const dispatch = useDispatch();

    const onClose = useCallback(() => {
      dispatch(navigateBack());
    }, [dispatch]);

    const onYesPress = useCallback(() => {
      dispatch(signOut.request());
    }, [dispatch]);

    const onNoPress = useCallback(() => {
      dispatch(navigateBack());
    }, [dispatch]);

    return (
      <Modal
        title="Are you sure you want to quit?"
        subtitle="This action will sign you out of the app."
        isVisible
        onClose={onClose}
      >
        <ContentContainer>
          <PrimaryButton secondary onPress={onYesPress}>
            YES
          </PrimaryButton>

          <PrimaryButton onPress={onNoPress}>NO</PrimaryButton>
        </ContentContainer>
      </Modal>
    );
  };

const ContentContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
