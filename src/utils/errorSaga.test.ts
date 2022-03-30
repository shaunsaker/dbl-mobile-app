import { expectSaga } from 'redux-saga-test-plan';
import { sentry } from '../sentry';
import { signUp } from '../store/auth/actions';
import { showSnackbar } from '../store/snackbars/actions';
import { SnackbarType } from '../store/snackbars/models';
import { errorSaga } from './errorSaga';

describe('errorSaga', () => {
  it('does nothing if an error is not provided', () => {
    const notAnError = { message: 'Pretending to be an error' };
    const action = signUp.failure;

    return (
      expectSaga(errorSaga, notAnError, signUp.failure)
        .not.call(sentry.captureException, notAnError)
        // @ts-expect-error mocking on purpose
        .not.put(action(notAnError))
        .not.put(
          showSnackbar({
            type: SnackbarType.error,
            title: 'Error',
            description: notAnError.message,
          }),
        )
        .run()
    );
  });

  it('disaptches actions if an error is provided', () => {
    const error = new Error('Im a real boy/error');
    const action = signUp.failure;

    return expectSaga(errorSaga, error, signUp.failure)
      .call(sentry.captureException, error)
      .put(action(error))
      .put(
        showSnackbar({
          type: SnackbarType.error,
          title: 'Error',
          description: error.message,
        }),
      )
      .run();
  });
});
