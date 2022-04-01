import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import {
  CustomTouchableOpacity,
  CustomTouchableOpacityProps,
} from './CustomTouchableOpacity';
import { Typography } from './Typography';

interface TextButtonProps extends CustomTouchableOpacityProps, ContainerProps {
  children: string;
  disabled?: boolean;
  onPress?: () => void;
}

export const TextButton = ({
  children,
  disabled,
  ...props
}: TextButtonProps): ReactElement => {
  return (
    <Container disabled={disabled} {...props}>
      <Typography
        bold
        small
        primary={!disabled}
        secondary={disabled}
        underline
        numberOfLines={1}
      >
        {children}
      </Typography>
    </Container>
  );
};

interface ContainerProps {}

const Container = styled(CustomTouchableOpacity)<ContainerProps>``;
