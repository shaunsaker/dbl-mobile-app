import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../../components/HeaderBar';
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
      <HeaderBar showBackButton />

      <Container>
        <LotResult lotId={lotId} />

        <LotStats lotId={lotId} />

        <MyTickets lotId={lotId} />

        <ShareLotContainer>
          <ShareLot lotId={lotId} />
        </ShareLotContainer>
      </Container>
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
