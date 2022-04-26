import { useCallback } from 'react';
import Share from 'react-native-share';
import { ShareOptions } from 'react-native-share';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/snackbars/actions';
import { SnackbarType } from '../store/snackbars/models';

export const useSharing = () => {
  const dispatch = useDispatch();

  const share = useCallback(
    async (options: ShareOptions) => {
      try {
        await Share.open({ ...options, failOnCancel: false });
      } catch (error) {
        dispatch(
          showSnackbar({
            type: SnackbarType.error,
            title: 'Error',
            description: (error as Error).message,
          }),
        );
      }
    },
    [dispatch],
  );

  return {
    share,
  };
};
