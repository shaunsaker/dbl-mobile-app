import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { PrimaryButton } from '../../../components/PrimaryButton';

import { Typography } from '../../../components/Typography';

interface OnboardingTwoProps {
  onSubmit: () => void;
}

export const OnboardingTwo = ({
  onSubmit,
}: OnboardingTwoProps): ReactElement => {
  return (
    <Container collapsable={false}>
      <Typography large bold>
        Onboarding Two
      </Typography>

      <StyledImage />

      <Typography bold>Entrancing Subheading</Typography>

      <Typography>Physics-defying Explanation</Typography>

      <PrimaryButton onPress={onSubmit}>CONTINUE</PrimaryButton>
    </Container>
  );
};

const Container = styled.View``;

const StyledImage = styled.View`
  width: 368px;
  height: 368px;
  background-color: black;
`;
