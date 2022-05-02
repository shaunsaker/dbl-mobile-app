import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { CloseButton } from '../../components/CloseButton';
import { LotStats } from '../../components/LotStats';
import { Page } from '../../components/Page';
import { ShareLot } from '../../components/ShareLot';
import { TicketsSummary } from '../../components/TicketsSummary';
import { RouteProps, Routes } from '../../router/models';
import { navigateBack } from '../../store/navigation/actions';

interface ResultProps extends RouteProps<Routes.result> {}

export const Result = ({ route }: ResultProps): ReactElement => {
  const { lotId } = route.params;

  const dispatch = useDispatch();

  const onClosePress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  return (
    <Page>
      <Container>
        <LotStats lotId={lotId} />

        <TicketsSummary lotId={lotId} />

        <ShareLotContainer>
          <ShareLot lotId={lotId} />
        </ShareLotContainer>
      </Container>

      <CloseButtonContainer>
        <CloseButton onPress={onClosePress} />
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
