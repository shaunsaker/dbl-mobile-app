import { objectToArray } from '../../utils/objectToArray';
import { ApplicationState } from '../reducers';
import { LotId } from './models';

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
  const lots = selectLots(state);

  if (!lots) {
    return null;
  }

  const activeLot = objectToArray(lots).find(lot => lot.active);

  if (!activeLot) {
    return null;
  }

  return activeLot.id;
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

export const selectLotsDataLoading = (state: ApplicationState) => {
  return state.lots.loading;
};
