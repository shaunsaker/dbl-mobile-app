import React, { ReactElement, ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface CustomTouchableOpacityProps extends TouchableOpacityProps {
  children?: ReactNode;
}

export const CustomTouchableOpacity = ({
  children,
  ...props
}: CustomTouchableOpacityProps): ReactElement => {
  return (
    <TouchableOpacity activeOpacity={0.67} {...props}>
      {children}
    </TouchableOpacity>
  );
};
