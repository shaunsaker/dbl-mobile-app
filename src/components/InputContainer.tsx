import React, { ReactElement, ReactNode } from 'react';
import { ScrollView } from 'react-native';

interface InputContainerProps {
  children: ReactNode;
}

export const InputContainer = ({
  children,
}: InputContainerProps): ReactElement => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
};
