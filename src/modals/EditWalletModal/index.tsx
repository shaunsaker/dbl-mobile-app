import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Modal } from '../../components/Modal';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInput } from '../../components/TextInput';
import { RouteProps, Routes } from '../../router/models';
import { navigate, navigateBack } from '../../store/navigation/actions';
import {
  addUserWalletAddress,
  editUserWallet,
} from '../../store/userProfile/actions';
import { selectUserWallets } from '../../store/userProfile/selectors';
import { validateWalletAddress } from '../../utils/validateWallletAddress';

interface EditWalletModalProps extends RouteProps<Routes.editWalletModal> {}

// TODO: SS if we're editing a wallet we should be able to mark it as preferred or not (but only if we have more than one wallet)
export const EditWalletModal = ({
  route,
}: EditWalletModalProps): ReactElement => {
  const dispatch = useDispatch();

  const walletId = route.params.walletId;
  const userWallets = useSelector(selectUserWallets);
  const userWalletAddress = walletId && userWallets[walletId]?.address;

  const QRCodeScannerWalletAddress = route.params.QRCodeScannerWalletAddress;

  const [walletAddress, setWalletAddress] = useState(userWalletAddress || '');

  const isSaveDisabled = !validateWalletAddress(walletAddress);

  useEffect(() => {
    // if the route updates with the QRCodeScannerWalletAddress, set it to state
    if (QRCodeScannerWalletAddress) {
      setWalletAddress(QRCodeScannerWalletAddress);
    }
  }, [QRCodeScannerWalletAddress]);

  const onClose = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  const onChangeWalletAddress = useCallback((text: string) => {
    setWalletAddress(text);
  }, []);

  const onScanQRCodePress = useCallback(() => {
    dispatch(navigate({ route: Routes.QRScannerModal }));
  }, [dispatch]);

  const onSave = useCallback(() => {
    // TODO: SS we can optimise this so that we only dispatch the actions if the data changed
    const isEditingWallet = walletId;

    if (isEditingWallet) {
      dispatch(
        editUserWallet.request({ id: walletId, address: walletAddress }),
      );
    } else {
      dispatch(addUserWalletAddress.request({ address: walletAddress }));
    }

    dispatch(navigateBack());
  }, [dispatch, walletId, walletAddress]);

  return (
    <Modal
      title={`${walletId ? 'Editing' : 'Adding'} Wallet Address`}
      isVisible
      onClose={onClose}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <TextInput
            label="Wallet Address"
            placeholder="E.g. 123456789123456789"
            value={walletAddress}
            onChangeText={onChangeWalletAddress}
          />

          <PrimaryButton small secondary onPress={onScanQRCodePress}>
            SCAN QR CODE
          </PrimaryButton>

          <PrimaryButton disabled={isSaveDisabled} onPress={onSave}>
            SAVE
          </PrimaryButton>
        </Container>
      </ScrollView>
    </Modal>
  );
};

const Container = styled.View``;
