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

jest.mock('mixpanel-react-native', () => ({
  __esModule: true,
  default: () => jest.fn(),
  Mixpanel: jest.fn(() => ({
    init: jest.fn(),
    identify: jest.fn(),
    setLoggingEnabled: jest.fn(),
    track: jest.fn(),
  })),
}));
