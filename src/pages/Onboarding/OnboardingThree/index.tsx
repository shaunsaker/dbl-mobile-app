import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { PrimaryButton } from '../../../components/PrimaryButton';

import { Typography } from '../../../components/Typography';

interface OnboardingThreeProps {
  onSubmit: () => void;
}

export const OnboardingThree = ({
  onSubmit,
}: OnboardingThreeProps): ReactElement => {
  return (
    <Container collapsable={false}>
      <Typography large bold>
        Onboarding Three
      </Typography>

      <StyledImage />

      <Typography bold>Entrancing Subheading</Typography>

      <Typography>Physics-defying Explanation</Typography>

      <PrimaryButton onPress={onSubmit}>DONE</PrimaryButton>
    </Container>
  );
};

const Container = styled.View``;

const StyledImage = styled.View`
  width: 368px;
  height: 368px;
  background-color: black;
`;
