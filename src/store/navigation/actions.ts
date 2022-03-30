import { createStandardAction } from 'typesafe-actions';
import { RouteStackParamList } from '../../router/models';

export const navigateBack = createStandardAction('NAVIGATION/navigateBack')();

export type NavigateToPayload = {
  [T in keyof RouteStackParamList]: {
    route: T;
    props?: RouteStackParamList[T];
  };
}[keyof RouteStackParamList];

export const navigate = createStandardAction(
  'NAVIGATION/navigate',
)<NavigateToPayload>();
