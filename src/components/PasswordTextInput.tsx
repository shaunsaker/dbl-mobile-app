import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import { TextInput as RNTextInput } from 'react-native';
import styled from 'styled-components/native';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';
import { TextInput, TextInputProps } from './TextInput';
import VisibilityOnIcon from '../icons/visibility-on.svg';
import VisibilityOffIcon from '../icons/visibility-off.svg';
import { colors } from '../theme/colors';

const VISIBILITY_ICON_SIZE = 24;

interface PasswordTextInputProps extends TextInputProps {}

export const PasswordTextInput = forwardRef(
  (
    props: PasswordTextInputProps,
    ref: ForwardedRef<RNTextInput>,
  ): ReactElement => {
    const [passwordHidden, setPasswordHidden] = useState(true);

    const onVisibilityButtonPress = useCallback(() => {
      setPasswordHidden(hidden => !hidden);
    }, []);

    return (
      <Container>
        <TextInput secureTextEntry={passwordHidden} {...props} ref={ref} />

        <VisibilityButton onPress={onVisibilityButtonPress}>
          {passwordHidden ? (
            <VisibilityOnIcon
              width={VISIBILITY_ICON_SIZE}
              height={VISIBILITY_ICON_SIZE}
              fill={colors.primaryText}
            />
          ) : (
            <VisibilityOffIcon
              width={VISIBILITY_ICON_SIZE}
              height={VISIBILITY_ICON_SIZE}
              fill={colors.primaryText}
            />
          )}
        </VisibilityButton>
      </Container>
    );
  },
);

const Container = styled.View``;

const VisibilityButton = styled(CustomTouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
`;
