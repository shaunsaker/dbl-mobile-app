import Clipboard from '@react-native-community/clipboard';
import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/snackbars/actions';
import { SnackbarType } from '../store/snackbars/models';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';
import CopyIconSvg from '../icons/copy.svg';
import { colors } from '../theme/colors';

const SIZE = 24;

interface CopyIconProps {
  value: string;
}

export const CopyIcon = ({ value }: CopyIconProps): ReactElement => {
  const dispatch = useDispatch();

  const onCopyPress = useCallback(async () => {
    Clipboard.setString(value);

    dispatch(
      showSnackbar({
        type: SnackbarType.success,
        title: 'Copied to Clipboard',
        description: value,
      }),
    );
  }, [value, dispatch]);

  return (
    <CustomTouchableOpacity onPress={onCopyPress}>
      <CopyIconSvg width={SIZE} height={SIZE} fill={colors.primaryText} />
    </CustomTouchableOpacity>
  );
};
