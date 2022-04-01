import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { LotStats } from '../../../components/LotStats';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { Typography } from '../../../components/Typography';

interface OnboardingEncouragementProps {
  onSubmit: () => void;
}

export const OnboardingEncouragement = ({
  onSubmit,
}: OnboardingEncouragementProps): ReactElement => {
  return (
    <Container collapsable={false}>
      <Typography large bold>
        Onboarding Encouragement (2/4)
      </Typography>

      <Typography>Here are some stats from our latest lot...</Typography>

      <LotStats />

      <PrimaryButton onPress={onSubmit}>I WANT IN ON THE ACTION!</PrimaryButton>
    </Container>
  );
};

const Container = styled.View``;
