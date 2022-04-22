import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';
import { BORDER_RADIUS } from '../theme/borderRadius';
import { colors } from '../theme/colors';
import { Typography } from './Typography';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  accessibilityLabel?: string;
  onPress: () => void;
}
export const Checkbox = ({
  label,
  checked,
  accessibilityLabel,
  onPress,
}: CheckboxProps): ReactElement => {
  return (
    <Wrapper>
      <Container accessibilityLabel={accessibilityLabel} onPress={onPress}>
        {checked && <CheckedInnerContainer />}
      </Container>

      {label && (
        <>
          <Typography small>{label}</Typography>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CHECKBOX_SIZE = 20;

const Container = styled(CustomTouchableOpacity)`
  width: ${CHECKBOX_SIZE}px;
  height: ${CHECKBOX_SIZE}px;
  border-radius: ${BORDER_RADIUS}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.border};
`;

const CheckedInnerContainer = styled.View`
  width: ${CHECKBOX_SIZE / 2}px;
  height: ${CHECKBOX_SIZE / 2}px;
  border-radius: ${BORDER_RADIUS / 2}px;
  background-color: ${colors.primary};
`;
