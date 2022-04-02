import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { TicketVerification } from '../../../components/TicketVerification';
import { Typography } from '../../../components/Typography';

interface OnboardingVerificationProps {}

export const OnboardingVerification =
  ({}: OnboardingVerificationProps): ReactElement => {
    return (
      <Container collapsable={false}>
        <Typography large bold>
          Onboarding Verification (4/4)
        </Typography>

        <TicketVerification />
      </Container>
    );
  };

const Container = styled.View``;
