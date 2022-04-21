import axios, { AxiosError } from 'axios';

export const getBTCUSDPrice = async (): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      );
      const rate = parseInt(response.data.bitcoin.usd);

      resolve(rate);
    } catch (error: Error | AxiosError | unknown) {
      if (axios.isAxiosError(error) && error.response) {
        reject(new Error(JSON.stringify(error.response.data)));
      }

      reject(error);
    }
  });
};
