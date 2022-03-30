import { fork, take, put, takeEvery, cancel, race } from 'redux-saga/effects';
import { channel, SagaIterator, Channel } from 'redux-saga';
import { safeDelay } from './safeDelay';
import { select } from './typedSelect';
import { shallowEqual } from 'react-redux';
import { call } from './call';

type PathTest<S> = (before: S, after: S) => boolean;

type Options<S> = {
  // To reduce the computational load of selectData, path tests can be added
  // E.g. selecting a list of time entries takes long, but it is only necessary to do if
  // `state.timeEntries` changed. So the option `{ pathTests: (before, after) => before.timeEntries !== after.timeEntries }` should be added
  pathTests?: Array<PathTest<S>>;
  // Debounce: Run `selectData` after specified number of milliseconds. If any action
  // is dispatched during that time, reset the counter. This should only be used
  // for code that doesn't need to see every state change.
  // E.g. if debounce is set to one second and property `example` changes from `10` to `20` but changes
  // back to `10` before the one second is over, `saga` will not be started.
  debounce?: number;
  method?: typeof takeEvery;
  equal?: typeof shallowEqual;
};

const defaultOptions = {
  pathTests: [],
  debounce: 0,
  method: takeEvery,
  equal: shallowEqual,
};

// Call `saga` every time `selectData` changes. Uses shallow equality for objects. Similar to `redux-react`.
// Runs forever. To stop, return `__connect_exit` in the saga.
export function* connectSaga<State, T>(
  selectData: (state: State) => T,
  saga: (data: T, oldData: T | undefined) => SagaIterator,
  optionsIn?: Options<State>,
): SagaIterator {
  const options = {
    ...defaultOptions,
    ...optionsIn,
  };

  // @ts-expect-error FIXME:
  const dataChangedChannel: Channel<{
    state: T;
    oldState: T | undefined;
  }> = yield* call(channel);

  const forkTask = yield fork(function* (): SagaIterator {
    let oldStore = yield* select(store => store);
    let oldData: T;

    const initialState = yield* select(storeState => storeState);
    oldData = selectData(initialState);
    yield put(dataChangedChannel, {
      state: oldData,
      oldState: undefined,
    });

    while (true) {
      yield take(() => true);

      if (options.debounce > 0) {
        while (true) {
          // @ts-expect-error FIXME:
          const { action } = yield race({
            action: take(() => true),
            debounce: call(safeDelay, options.debounce),
          });

          // Break out once we reach the debounce timeout
          if (!action) {
            break;
          }
        }
      }

      const state = yield* select(storeState => storeState);

      if (state !== oldStore) {
        if (
          options.pathTests.length === 0 ||
          options.pathTests.some(pathTest => pathTest(oldStore, state))
        ) {
          const data = selectData(state);

          if (!options.equal(data, oldData)) {
            yield put(dataChangedChannel, {
              state: data,
              oldState: oldData,
            });
          }

          oldData = data;
        }
      }

      oldStore = state;
    }
  });

  yield options.method(dataChangedChannel, function* (data) {
    const result = yield* call(saga, data.state, data.oldState);
    if (result === '__connect_exit') {
      dataChangedChannel.close();
      yield cancel(forkTask);
    }
  });
}
