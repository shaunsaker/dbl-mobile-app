import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { CopyIcon } from './CopyIcon';
import { Typography } from './Typography';

interface BlockchainAddressProps {
  children: string;
}

export const BlockchainAddress = ({
  children: address,
}: BlockchainAddressProps): ReactElement => {
  return (
    <Container>
      <Typography>
        {address}

        <CopyIcon value={address} />
      </Typography>
    </Container>
  );
};

const Container = styled.View``;
