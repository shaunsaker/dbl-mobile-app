import { useCallback, useLayoutEffect, useState } from 'react';
import { getBTCUSDPrice } from '../coinGecko/getBTCUSDPrice';

export const useBTCUSDRate = () => {
  const [rate, setRate] = useState(0);

  const getRate = useCallback(async () => {
    // get the rate
    // FIXME: handle error
    const BTCUSDRate = await getBTCUSDPrice();

    setRate(BTCUSDRate);
  }, [setRate]);

  useLayoutEffect(() => {
    getRate();
  });

  return rate;
};
