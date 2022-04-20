import React, { createRef, ReactElement, useCallback, useState } from 'react';
import PagerView from 'react-native-pager-view';
import styled from 'styled-components/native';
import { Typography } from '../Typography';
import { TicketPayment } from './TicketPayment';
import { TicketSelection } from './TicketSelection';

interface BuyTicketProps {}

export const BuyTickets = ({}: BuyTicketProps): ReactElement => {
  const pagerViewRef = createRef<PagerView>();

  const [pageIndex, setPageIndex] = useState(0);

  const onPageSelected = useCallback(
    event => {
      setPageIndex(event.nativeEvent.position);
    },
    [setPageIndex],
  );

  const onSubmit = useCallback(
    (currentPageIndex: number) => {
      pagerViewRef.current?.setPage(currentPageIndex + 1);
    },
    [pagerViewRef],
  );

  return (
    <Container>
      <Typography bold>Buy Tickets</Typography>

      <StyledPagerView ref={pagerViewRef} onPageSelected={onPageSelected}>
        <PageContainer collapsable={false}>
          <TicketSelection onSubmit={() => onSubmit(0)} />
        </PageContainer>

        <PageContainer collapsable={false}>
          <TicketPayment onSubmit={() => onSubmit(1)} />
        </PageContainer>
      </StyledPagerView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const StyledPagerView = styled(PagerView)`
  flex: 1;
`;

const PageContainer = styled.View``;
