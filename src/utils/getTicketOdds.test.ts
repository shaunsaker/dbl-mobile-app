import { getTicketOdds } from './getTicketOdds';

describe('getTicketOdds', () => {
  it('returns 0 if the user has no new tickets', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 0,
        existingUserTicketCount: 5,
        totalLotTicketCount: 10,
      }),
    ).toEqual(0);
  });

  it('returns 0 if the user has no new or existing tickets', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 0,
        existingUserTicketCount: 0,
        totalLotTicketCount: 10,
      }),
    ).toEqual(0);
  });

  it('returns 1 if its the first ticket being purchased', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 1,
        existingUserTicketCount: 0,
        totalLotTicketCount: 0,
      }),
    ).toEqual(1);
  });

  it('returns 10', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 1,
        existingUserTicketCount: 0,
        totalLotTicketCount: 9,
      }),
    ).toEqual(10);
  });

  it('returns 1', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 1,
        existingUserTicketCount: 9,
        totalLotTicketCount: 9,
      }),
    ).toEqual(1);
  });
});
