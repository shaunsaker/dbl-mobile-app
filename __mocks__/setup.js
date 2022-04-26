import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-firebase/app', () => ({}));

jest.mock('@react-native-firebase/auth', () => ({}));

jest.mock('@react-native-firebase/firestore', () => ({}));

jest.mock('@react-native-firebase/functions', () => ({
  firebase: {
    app: () => ({
      functions: () => {},
    }),
  },
}));

jest.mock('@sentry/react-native', () => ({
  init: () => {},

  captureException: () => {},
}));
