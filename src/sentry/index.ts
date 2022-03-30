import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://4576cdc9f1704d6394489b26ff4655e0@o447395.ingest.sentry.io/6299602',
});

export { Sentry as sentry };
