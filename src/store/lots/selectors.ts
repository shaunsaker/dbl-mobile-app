import { objectToArray } from '../../utils/objectToArray';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { ApplicationState } from '../reducers';
import { LotId } from './models';

export const selectLotsDataLoading = (state: ApplicationState) => {
  return state.lots.loading;
};

export const selectLots = (state: ApplicationState) => {
  if (!state.lots.data) {
    return null;
  }

  return state.lots.data;
};

export const selectActiveLot = (state: ApplicationState) => {
  const lots = selectLots(state);

  if (!lots) {
    return null;
  }

  const activeLot = objectToArray(lots).find(lot => lot.active);

  if (!activeLot) {
    return null;
  }

  return activeLot;
};

export const selectActiveLotId = (state: ApplicationState) => {
  const activeLot = selectActiveLot(state);

  return activeLot?.id;
};

export const selectLotById = (state: ApplicationState, lotId: LotId) => {
  const lots = selectLots(state);

  if (!lots) {
    return null;
  }

  const lot = lots[lotId];

  if (!lot) {
    return null;
  }

  return lot;
};

export const selectInactiveLotsSortedByDate = (state: ApplicationState) => {
  const lots = selectLots(state);

  if (!lots) {
    return null;
  }

  const inactiveLots = objectToArray(lots).filter(lot => !lot.active);
  const sortedInactiveLots = sortArrayOfObjectsByKey(
    inactiveLots,
    'drawTime',
    true, // newest to oldest
  );

  return sortedInactiveLots;
};

export const selectLatestInactiveLot = (state: ApplicationState) => {
  const sortedInactiveLots = selectInactiveLotsSortedByDate(state);

  if (!sortedInactiveLots) {
    return null;
  }

  const latestInactiveLot = sortedInactiveLots[0];

  return latestInactiveLot;
};

export const selectLatestInactiveLotId = (state: ApplicationState) => {
  const lot = selectLatestInactiveLot(state);

  return lot?.id;
};
