import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/snackbars/actions';
import { SnackbarType } from '../store/snackbars/models';

export const useLinking = () => {
  const dispatch = useDispatch();

  const openLink = useCallback(
    async url => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        dispatch(
          showSnackbar({
            type: SnackbarType.error,
            title: 'Unable to open link',
            description: url,
          }),
        );
      }
    },
    [dispatch],
  );

  return {
    openLink,
  };
};
