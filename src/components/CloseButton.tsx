import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { navigateBack } from '../store/navigation/actions';
import CloseIcon from '../icons/close.svg';
import { colors } from '../theme/colors';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';

const CLOSE_ICON_SIZE = 24;

interface CloseButtonProps {
  onPress?: () => void;
}

export const CloseButton = ({
  onPress: onPressCb,
}: CloseButtonProps): ReactElement => {
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    dispatch(navigateBack());

    if (onPressCb) {
      onPressCb();
    }
  }, [dispatch, onPressCb]);

  return (
    <Container onPress={onPress}>
      <CloseIcon
        width={CLOSE_ICON_SIZE}
        height={CLOSE_ICON_SIZE}
        fill={colors.primaryText}
      />
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)``;
