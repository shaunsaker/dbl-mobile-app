import React, { ReactElement, useCallback } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';
import { Typography } from './Typography';
import { useLinking } from './useLinking';
import Config from 'react-native-config';

interface CustomDrawerProps extends DrawerContentComponentProps {}

export const CustomDrawer = ({ ...props }: CustomDrawerProps): ReactElement => {
  const { openLink } = useLinking();

  const onContactSupportPress = useCallback(() => {
    openLink(`mailto:${Config.SUPPORT_EMAIL}`);
  }, [openLink]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <CustomTouchableOpacity onPress={onContactSupportPress}>
        <Typography bold>Contact Support</Typography>
      </CustomTouchableOpacity>
    </DrawerContentScrollView>
  );
};
