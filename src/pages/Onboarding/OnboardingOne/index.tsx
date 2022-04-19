import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { PrimaryButton } from '../../../components/PrimaryButton';

import { Typography } from '../../../components/Typography';

interface OnboardingOneProps {
  onSubmit: () => void;
}

export const OnboardingOne = ({
  onSubmit,
}: OnboardingOneProps): ReactElement => {
  return (
    <Container collapsable={false}>
      <Typography large bold>
        Onboarding One
      </Typography>

      <Typography bold>Entrancing Subheading</Typography>

      <Typography>Physics-defying Explanation</Typography>

      <PrimaryButton onPress={onSubmit}>CONTINUE</PrimaryButton>
    </Container>
  );
};

const Container = styled.View``;
