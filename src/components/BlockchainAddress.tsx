import Clipboard from '@react-native-community/clipboard';
import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { showSnackbar } from '../store/snackbars/actions';
import { SnackbarType } from '../store/snackbars/models';
import { PrimaryButton } from './PrimaryButton';
import { Typography } from './Typography';

interface BlockchainAddressProps {
  children: string;
}

export const BlockchainAddress = ({
  children: address,
}: BlockchainAddressProps): ReactElement => {
  const dispatch = useDispatch();

  const onCopyPress = useCallback(async () => {
    Clipboard.setString(address);

    dispatch(
      showSnackbar({
        type: SnackbarType.success,
        title: 'Copied to Clipboard',
        description: address,
      }),
    );
  }, [address, dispatch]);

  return (
    <Container>
      <Typography>{address}</Typography>

      <PrimaryButton onPress={onCopyPress}>COPY TO CLIPBOARD</PrimaryButton>
    </Container>
  );
};

const Container = styled.View``;
