import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import ChevronLeftIcon from '../icons/chevron-left.svg';
import { colors } from '../theme/colors';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';

const ICON_SIZE = 24;

interface BackButtonPropsProps {
  onPress: () => void;
}

export const BackButton = ({ onPress }: BackButtonPropsProps): ReactElement => {
  return (
    <Container onPress={onPress}>
      <ChevronLeftIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        fill={colors.primaryText}
      />
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)``;
