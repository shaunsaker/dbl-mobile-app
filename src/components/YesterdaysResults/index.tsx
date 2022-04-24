import React, { ReactElement, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../router/models';
import {
  selectLatestInactiveLot,
  selectLotsDataLoading,
} from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { LotResult } from '../LotResult';
import { Typography } from '../Typography';

interface YesterdaysResultsProps {}

export const YesterdaysResults =
  ({}: YesterdaysResultsProps): ReactElement | null => {
    const dispatch = useDispatch();

    const loading = useSelector(selectLotsDataLoading);
    const latestInactiveLot = useSelector(selectLatestInactiveLot);

    const onViewMoreResultsPress = useCallback(() => {
      dispatch(navigate({ route: Routes.results }));
    }, [dispatch]);

    return (
      <Container>
        <Typography bold>Yesterday's Results</Typography>

        {latestInactiveLot ? (
          <>
            <LotResult lot={latestInactiveLot} />

            <CustomTouchableOpacity onPress={onViewMoreResultsPress}>
              <Typography bold>View More Results</Typography>
            </CustomTouchableOpacity>
          </>
        ) : loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Typography>No Results Yet</Typography>
        )}
      </Container>
    );
  };

const Container = styled.View``;
