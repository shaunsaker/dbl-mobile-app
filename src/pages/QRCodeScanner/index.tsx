import React, { useCallback } from 'react';
import RNQRCodeScanner from 'react-native-qrcode-scanner';
import { Typography } from '../../components/Typography';
import { colors } from '../../theme/colors';
import styled from 'styled-components/native';
import { CustomTouchableOpacity } from '../../components/CustomTouchableOpacity';
import CloseIcon from '../../icons/close.svg';
import { BarCodeReadEvent } from 'react-native-camera';
import { useDispatch } from 'react-redux';
import { navigateBack } from '../../store/navigation/actions';

const CLOSE_ICON_SIZE = 24;

interface TopSectionProps {
  onClose: () => void;
}

const TopSection = ({ onClose }: TopSectionProps) => {
  return (
    <>
      <Typography large bold>
        Capture QR Code
      </Typography>

      <Typography>Frame the QR Code within the box below.</Typography>

      <StyledCloseButton onPress={onClose}>
        <CloseIcon
          width={CLOSE_ICON_SIZE}
          height={CLOSE_ICON_SIZE}
          fill={colors.primaryText}
        />
      </StyledCloseButton>
    </>
  );
};

interface QRCodeScannerProps {}

export const QRCodeScanner = ({}: QRCodeScannerProps) => {
  const dispatch = useDispatch();

  const onRead = useCallback(
    // eslint-disable-next-line
    (event: BarCodeReadEvent) => {
      // TODO: SS
    },
    [],
  );

  const onClose = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  return (
    <RNQRCodeScanner
      containerStyle={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: colors.white,
        justifyContent: 'center',
      }}
      topContent={<TopSection onClose={onClose} />}
      topViewStyle={{
        backgroundColor: colors.white,
      }}
      bottomViewStyle={{ backgroundColor: colors.white }}
      showMarker
      markerStyle={{ borderWidth: 3, borderColor: colors.primary }}
      fadeIn={false}
      onRead={onRead}
    />
  );
};

const StyledCloseButton = styled(CustomTouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
`;
