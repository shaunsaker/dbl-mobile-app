import moment from 'moment';
import { getFormattedTime } from './getFormattedTime';

describe('getFormattedTime', () => {
  it('returns the formatted time without days or hours', () => {
    expect(getFormattedTime(moment('2018-08-26T17:00:00.000'))).toEqual(
      '26 Aug 2018',
    );
  });

  it('returns the formatted time with hours but without days', () => {
    expect(getFormattedTime(moment('2018-08-26T17:00:00.000'), true)).toEqual(
      '17:08, 26 Aug 2018',
    );
  });

  it('returns the formatted time with hours and days', () => {
    expect(
      getFormattedTime(moment('2018-08-26T17:00:00.000'), true, true),
    ).toEqual('17:08 Sun, 26 Aug 2018');
  });
});
