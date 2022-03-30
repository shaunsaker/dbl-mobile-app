import React, { ReactElement, useCallback } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { RHYTHM } from '../../theme/rhythm';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { Typography } from '../Typography';
import ChevronLeftIcon from '../../icons/chevron-left.svg';
import { useDispatch } from 'react-redux';
import { navigateBack } from '../../store/navigation/actions';

export const HEADER_BAR_BACK_BUTTON_LABEL = 'header bar back button';

interface HeaderBarProps {
  showBackButton?: boolean;
}

export const HeaderBar = ({ showBackButton }: HeaderBarProps): ReactElement => {
  const dispatch = useDispatch();

  const onBackPress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  return (
    <Container>
      {showBackButton && (
        <StyledBackButton
          accessibilityLabel={HEADER_BAR_BACK_BUTTON_LABEL}
          onPress={onBackPress}>
          <StyledChevronLeftIcon fill={colors.primaryText} />
        </StyledBackButton>
      )}

      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Logo />

      <Typography bold>DBL</Typography>
    </Container>
  );
};

export const HEADER_BAR_HEIGHT = 64;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 ${RHYTHM}px;
  height: ${HEADER_BAR_HEIGHT}px;
  background-color: ${colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

const StyledBackButton = styled(CustomTouchableOpacity)``;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)``;

const Logo = styled.View`
  width: 20px;
  height: 20px;
  background-color: black;
`;
