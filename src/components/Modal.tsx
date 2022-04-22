import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/native';
import ReactNativeModal from 'react-native-modal';
import { colors } from '../theme/colors';
import { RHYTHM } from '../theme/rhythm';
import { StatusBar } from 'react-native';
import { HEADER_BAR_HEIGHT } from './HeaderBar';
import { BORDER_RADIUS } from '../theme/borderRadius';
import { Typography } from './Typography';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';
import CloseIcon from '../icons/close.svg';

const CLOSE_ICON_SIZE = 24;

const BACKDROP_COLOR = colors.backdrop;

export interface ModalProps {
  title: string;
  subtitle?: string;
  isVisible: boolean;
  disableSwipeAway?: boolean; // useful for when you have a ScrollView in the Modal
  closeButtonAccessiblityLabel?: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({
  title,
  subtitle,
  isVisible,
  disableSwipeAway,
  closeButtonAccessiblityLabel,
  children,
  onClose,
}: ModalProps): ReactElement => {
  return (
    <StyledModal
      isVisible={isVisible}
      backdropColor={BACKDROP_COLOR}
      backdropOpacity={1}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      coverScreen={false}
      swipeDirection={disableSwipeAway ? undefined : 'down'}
      propagateSwipe={disableSwipeAway}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <ContentContainer>
        <Typography large bold>
          {title}
        </Typography>

        {subtitle && <Typography>{subtitle}</Typography>}

        {children}

        <StyledCloseButton
          accessibilityLabel={closeButtonAccessiblityLabel}
          onPress={onClose}
        >
          <CloseIcon
            width={CLOSE_ICON_SIZE}
            height={CLOSE_ICON_SIZE}
            fill={colors.primaryText}
          />
        </StyledCloseButton>
      </ContentContainer>

      <StatusBar backgroundColor={BACKDROP_COLOR} />
    </StyledModal>
  );
};

const StyledModal = styled(ReactNativeModal)`
  margin: 0;
  flex: 1;
  margin-top: ${HEADER_BAR_HEIGHT + RHYTHM * 4}px;
  border-top-left-radius: ${BORDER_RADIUS}px;
  border-top-right-radius: ${BORDER_RADIUS}px;
`;

const StyledCloseButton = styled(CustomTouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
`;

const ContentContainer = styled.View`
  background-color: ${colors.white};
  flex: 1;
  border-top-left-radius: ${BORDER_RADIUS}px;
  border-top-right-radius: ${BORDER_RADIUS}px;
  padding: ${RHYTHM}px;
`;
