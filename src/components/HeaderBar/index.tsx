import React, { ReactElement, useCallback } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { RHYTHM } from '../../theme/rhythm';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { Typography } from '../Typography';
import ChevronLeftIcon from '../../icons/chevron-left.svg';
import { useDispatch } from 'react-redux';
import { navigate, navigateBack } from '../../store/navigation/actions';
import MenuIcon from '../../icons/menu.svg';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Routes } from '../../router/models';

export const HEADER_BAR_BACK_BUTTON_LABEL = 'header bar back button';

interface HeaderBarProps {
  showBackButton?: boolean;
}

export const HeaderBar = ({ showBackButton }: HeaderBarProps): ReactElement => {
  const dispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const onLogoPress = useCallback(() => {
    dispatch(navigate({ route: Routes.home }));
  }, [dispatch]);

  const onBackPress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  const onMenuPress = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <LogoContainer>
        {showBackButton && (
          <StyledBackButton
            accessibilityLabel={HEADER_BAR_BACK_BUTTON_LABEL}
            onPress={onBackPress}
          >
            <StyledChevronLeftIcon fill={colors.primaryText} />
          </StyledBackButton>
        )}

        <CustomTouchableOpacity onPress={onLogoPress}>
          <LogoContainer>
            <Logo />

            <Typography bold>DBL</Typography>
          </LogoContainer>
        </CustomTouchableOpacity>
      </LogoContainer>

      <CustomTouchableOpacity onPress={onMenuPress}>
        <MenuIcon />
      </CustomTouchableOpacity>
    </Container>
  );
};

export const HEADER_BAR_HEIGHT = 64;

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${RHYTHM}px;
  height: ${HEADER_BAR_HEIGHT}px;
  background-color: ${colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

const StyledBackButton = styled(CustomTouchableOpacity)``;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)``;

const LogoContainer = styled.View`
  flex-direction: row;
`;

const Logo = styled.View`
  width: 20px;
  height: 20px;
  background-color: black;
`;
