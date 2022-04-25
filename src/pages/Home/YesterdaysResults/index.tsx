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

    const onLotPress = useCallback(() => {
      if (!yesterdaysLotId) {
        return;
      }

      dispatch(
        navigate({ route: Routes.result, props: { lotId: yesterdaysLotId } }),
      );
    }, [dispatch, yesterdaysLotId]);

    const onViewMoreResultsPress = useCallback(() => {
      dispatch(navigate({ route: Routes.results }));
    }, [dispatch]);

    return (
      <Container>
        <Typography bold>Yesterday's Results</Typography>

        {yesterdaysLotId ? (
          <>
            <LotResult lotId={yesterdaysLotId} onPress={onLotPress} />

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
