import React, { ForwardedRef, forwardRef, ReactElement } from 'react';
import {
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
} from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../theme/colors';
import { Typography } from './Typography';

export interface TextInputProps extends RNTextInputProps {
  label: string;
}

export const TextInput = forwardRef(
  (
    { label, ...props }: TextInputProps,
    ref: ForwardedRef<RNTextInput>,
  ): ReactElement => {
    return (
      <Container>
        <Typography small>{label}</Typography>

        <StyledTextInput
          placeholderTextColor={colors.secondaryText}
          underlineColorAndroid="transparent"
          {...props}
          // @ts-expect-error RN accessibilityRole types are invalid
          ref={ref}
        />
      </Container>
    );
  },
);

const Container = styled.View`
  border-bottom-width: 1px;
  border-color: ${colors.border};
`;

const StyledTextInput = styled.TextInput`
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.primaryText};
`;
