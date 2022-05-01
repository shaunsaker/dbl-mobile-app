import { combineReducers } from 'redux';
import { AuthState } from './auth/models';
import { authReducer } from './auth/reducer';
import { BtcRateState } from './btcRate/models';
import { btcRateReducer } from './btcRate/reducer';
import { InvoicesState } from './invoices/models';
import { invoicesReducer } from './invoices/reducer';
import { LotsState } from './lots/models';
import { lotsReducer } from './lots/reducer';
import { OnboardingState } from './onboarding/models';
import { onboardingReducer } from './onboarding/reducer';
import { PaymentsState } from './payments/models';
import { paymentsReducer } from './payments/reducer';
import { TicketsState } from './tickets/models';
import { ticketsReducer } from './tickets/reducer';
import { UserProfileState } from './userProfile/models';
import { userProfileReducer } from './userProfile/reducer';

export interface ApplicationState {
  auth: AuthState;
  btcRate: BtcRateState;
  invoices: InvoicesState;
  lots: LotsState;
  onboarding: OnboardingState;
  payments: PaymentsState;
  tickets: TicketsState;
  userProfile: UserProfileState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  btcRate: btcRateReducer,
  invoices: invoicesReducer,
  lots: lotsReducer,
  onboarding: onboardingReducer,
  payments: paymentsReducer,
  tickets: ticketsReducer,
  userProfile: userProfileReducer,
});

// @ts-expect-error FIXME:
export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
