import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import CloseIcon from '../icons/close.svg';
import { colors } from '../theme/colors';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';

const ICON_SIZE = 24;

interface CloseButtonProps {
  onPress: () => void;
}

export const CloseButton = ({ onPress }: CloseButtonProps): ReactElement => {
  return (
    <Container onPress={onPress}>
      <CloseIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        fill={colors.primaryText}
      />
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)``;
