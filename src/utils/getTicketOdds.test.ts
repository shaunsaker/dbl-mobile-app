import { getTicketOdds } from './getTicketOdds';

describe('getTicketOdds', () => {
  it('returns 0% if the user has no new or existing tickets', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 0,
        existingUserTicketCount: 0,
        totalLotTicketCount: 10,
      }),
    ).toEqual(0);
  });

  it('returns 100% if its the first ticket being purchased', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 1,
        existingUserTicketCount: 0,
        totalLotTicketCount: 0,
      }),
    ).toEqual(100);
  });

  it('returns 100% if I own all existing tickets', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 1,
        existingUserTicketCount: 1,
        totalLotTicketCount: 1,
      }),
    ).toEqual(100);
  });

  it('returns 50% if I would own half the tickets', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 1,
        existingUserTicketCount: 0,
        totalLotTicketCount: 1,
      }),
    ).toEqual(50);
  });

  it('returns 67% if I would own 2/3s of the tickets', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 1,
        existingUserTicketCount: 1,
        totalLotTicketCount: 2,
      }),
    ).toEqual(67);
  });

  it('returns 33% if I would own 1/3 of the tickets', () => {
    expect(
      getTicketOdds({
        newUserTicketCount: 1,
        existingUserTicketCount: 0,
        totalLotTicketCount: 2,
      }),
    ).toEqual(33);
  });
});
