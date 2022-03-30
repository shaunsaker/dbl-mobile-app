import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import {
  CustomTouchableOpacity,
  CustomTouchableOpacityProps,
} from './CustomTouchableOpacity';
import { colors } from '../theme/colors';

interface ActionButtonProps extends CustomTouchableOpacityProps {}

export const ActionButton = ({
  children,
  ...props
}: ActionButtonProps): ReactElement => {
  return <Container {...props}>{children}</Container>;
};

const SIZE = 48;

const Container = styled(CustomTouchableOpacity)`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${colors.secondary};
  justify-content: center;
  align-items: center;
`;
