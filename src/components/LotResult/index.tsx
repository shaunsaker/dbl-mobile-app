import moment from 'moment';
import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../router/models';
import { Currency } from '../../store/btcRate/models';
import { selectBtcRateByCurrency } from '../../store/btcRate/selectors';
import { LotId } from '../../store/lots/models';
import { selectLotById } from '../../store/lots/selectors';
import { navigate } from '../../store/navigation/actions';
import { ApplicationState } from '../../store/reducers';
import { selectUserWinningByLotId } from '../../store/userProfile/selectors';
import { numberToDigits } from '../../utils/numberToDigits';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { Typography } from '../Typography';

interface LotResultProps {
  lotId: LotId;
  onPress?: () => void;
}

export const LotResult = ({
  lotId,
  onPress,
}: LotResultProps): ReactElement | null => {
  const dispatch = useDispatch();

  const lot = useSelector((state: ApplicationState) =>
    selectLotById(state, lotId),
  );

  const rate = useSelector((state: ApplicationState) =>
    selectBtcRateByCurrency(state, Currency.usd),
  );

  const didUserWinThisLot = Boolean(
    useSelector((state: ApplicationState) =>
      selectUserWinningByLotId(state, lotId),
    ),
  );

  const onViewWinningDetailsPress = useCallback(() => {
    dispatch(navigate({ route: Routes.winner, props: { lotId } }));
  }, [dispatch, lotId]);

  if (!lot) {
    return null;
  }

  return (
    <Container disabled={!onPress} onPress={onPress}>
      <Typography>
        {moment(lot.drawTime).format('dddd, DD MMMM YYYY')}
      </Typography>

      <Typography large bold>
        {lot.winnerUsername}
      </Typography>

      <Typography bold>
        {lot.totalBTC} BTC ($
        {numberToDigits(lot?.totalBTC * rate, 0)})
      </Typography>

      {didUserWinThisLot && (
        <>
          <Typography>You won this one 🎉</Typography>

          <CustomTouchableOpacity onPress={onViewWinningDetailsPress}>
            <Typography bold>View Details</Typography>
          </CustomTouchableOpacity>
        </>
      )}
    </Container>
  );
};

const Container = styled(CustomTouchableOpacity)`
  border-width: 1px;
`;
