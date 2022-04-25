import Config from 'react-native-config';

declare module 'react-native-config' {
  export interface NativeConfig {
    SUPPORT_EMAIL: string;
    BLOCKCHAIN_EXPLORER_URL: string;
  }

  export default Config;
}
