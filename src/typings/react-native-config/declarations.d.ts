import Config from 'react-native-config';

declare module 'react-native-config' {
  export interface NativeConfig {
    SUPPORT_EMAIL: string;
  }

  export const Config: NativeConfig;

  export default Config;
}
