import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { PrimaryButton } from '../../../components/PrimaryButton';

import { Typography } from '../../../components/Typography';

interface OnboardingIntroProps {
  onSubmit: () => void;
}

export const OnboardingIntro = ({
  onSubmit,
}: OnboardingIntroProps): ReactElement => {
  return (
    <Container collapsable={false}>
      <Typography large bold>
        Onboarding Intro (1/4)
      </Typography>

      <Typography bold>Entrancing Subheading</Typography>

      <Typography>Physics-defying Explanation</Typography>

      <PrimaryButton onPress={onSubmit}>CONTINUE</PrimaryButton>
    </Container>
  );
};

const Container = styled.View``;
