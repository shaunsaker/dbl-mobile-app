import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { CloseButton } from '../../components/CloseButton';
import { LotResult } from '../../components/LotResult';
import { LotStats } from '../../components/LotStats';
import { MyTickets } from '../../components/MyTickets';
import { Page } from '../../components/Page';
import { ShareLot } from '../../components/ShareLot';
import { RouteProps, Routes } from '../../router/models';

interface ResultProps extends RouteProps<Routes.result> {}

export const Result = ({ route }: ResultProps): ReactElement => {
  const { lotId } = route.params;

  return (
    <Page>
      <Container>
        <LotResult lotId={lotId} />

        <LotStats lotId={lotId} />

        <MyTickets lotId={lotId} />

        <ShareLotContainer>
          <ShareLot lotId={lotId} />
        </ShareLotContainer>
      </Container>

      <CloseButtonContainer>
        <CloseButton />
      </CloseButtonContainer>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ShareLotContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const CloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
