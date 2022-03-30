import { jest } from '@jest/globals';
import { expectSaga as _expectSaga, SagaType } from 'redux-saga-test-plan';
import { createStore } from 'redux';

import rootReducer, { ApplicationState, initialState } from '../store/reducers';

export const createTestState = (): ApplicationState => {
  const state = initialState;

  return state;
};

// a test helper that returns an extendable saga runner
// with some boilerplate state to reduce test setup
export const configureTestStore = <S extends SagaType>(
  mockedState?: ApplicationState,
) => {
  // if we supply mockedState, use that, otherwise use the test state
  const state = mockedState || createTestState();

  // create a mock store with preloaded state
  const store = createStore(rootReducer, state); // state exists

  // and with a mocked dispatch action
  const originalDispatch = store.dispatch;
  const mockedDispatch = jest.fn(originalDispatch);

  // @ts-expect-error mocked
  store.dispatch = mockedDispatch;

  // don't forget to call saga(...).run() in your tests!
  const saga = (generator: S, ...sagaArgs: Parameters<S>) =>
    _expectSaga(generator, ...sagaArgs)
      // this allows us to observe state changes, e.g. with hasFinalState method
      .withReducer(rootReducer)
      // this sets our created state in the reducer above
      .withState(state);

  return {
    state: state as ApplicationState, // state is definitely defined
    saga,
    store,
  };
};
