import { Mixpanel } from 'mixpanel-react-native';

const mixpanel = new Mixpanel('7a8dd0cda467b938d647135678f8862d');

mixpanel.init();

// enable logging in production only
// TODO: SS we should only log when running the production environment (not just production build)
mixpanel.setLoggingEnabled(!__DEV__);

export { mixpanel };
