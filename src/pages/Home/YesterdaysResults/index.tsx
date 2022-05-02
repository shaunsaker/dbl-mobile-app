import React, { ReactElement, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../../router/models';
import {
  selectLatestInactiveLotId,
  selectLotsDataLoading,
} from '../../../store/lots/selectors';
import { navigate } from '../../../store/navigation/actions';
import { CustomTouchableOpacity } from '../../../components/CustomTouchableOpacity';
import { LotResult } from '../../../components/LotResult';
import { Typography } from '../../../components/Typography';

interface YesterdaysResultsProps {}

export const YesterdaysResults =
  ({}: YesterdaysResultsProps): ReactElement | null => {
    const dispatch = useDispatch();

    const loading = useSelector(selectLotsDataLoading);
    const yesterdaysLotId = useSelector(selectLatestInactiveLotId);

    const onViewMoreResultsPress = useCallback(() => {
      dispatch(navigate({ route: Routes.results }));
    }, [dispatch]);

    return (
      <Container>
        <Typography bold>Yesterday's Results</Typography>

        {loading ? (
          <ActivityIndicator size="small" />
        ) : yesterdaysLotId ? (
          <>
            <LotResult lotId={yesterdaysLotId} />

            <CustomTouchableOpacity onPress={onViewMoreResultsPress}>
              <Typography bold>View More Results</Typography>
            </CustomTouchableOpacity>
          </>
        ) : (
          <Typography>No Results Yet</Typography>
        )}
      </Container>
    );
  };

const Container = styled.View``;
