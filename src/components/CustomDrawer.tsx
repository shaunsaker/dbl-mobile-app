import React, { ReactElement, useCallback } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';
import { Typography } from './Typography';
import { useLinking } from './useLinking';
import { useSharing } from './useSharing';
import Config from 'react-native-config';

interface CustomDrawerProps extends DrawerContentComponentProps {}

export const CustomDrawer = ({ ...props }: CustomDrawerProps): ReactElement => {
  const { openLink } = useLinking();

  const { share } = useSharing();

  const onContactSupportPress = useCallback(async () => {
    const link = `mailto:${Config.SUPPORT_EMAIL}`;

    await openLink(link);
  }, [openLink]);

  const onSharePress = useCallback(async () => {
    const title = 'Get money fam!';
    const subject = title;
    const message = 'Epic lottery biznaz fam!';
    const url = Config.APP_DOWNLOAD_URL;

    share({ title, subject, message, url });
  }, [share]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <CustomTouchableOpacity onPress={onContactSupportPress}>
        <Typography bold>Contact Support</Typography>
      </CustomTouchableOpacity>

      <CustomTouchableOpacity onPress={onSharePress}>
        <Typography bold>Share</Typography>
      </CustomTouchableOpacity>
    </DrawerContentScrollView>
  );
};
