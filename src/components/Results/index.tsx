import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { Typography } from '../Typography';

interface ResultsProps {}

export const Results = ({}: ResultsProps): ReactElement => {
  return (
    <Container>
      <Typography bold>Results</Typography>
    </Container>
  );
};

const Container = styled.View``;
