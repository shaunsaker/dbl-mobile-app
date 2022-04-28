// returns the % chance a user will win
export const getTicketOdds = ({
  newUserTicketCount,
  existingUserTicketCount,
  totalLotTicketCount,
}: {
  newUserTicketCount: number;
  existingUserTicketCount: number;
  totalLotTicketCount: number;
}): number => {
  if (!newUserTicketCount && !existingUserTicketCount) {
    return 0;
  }

  if (!totalLotTicketCount) {
    return 100;
  }

  const ticketOdds =
    100 *
    ((newUserTicketCount + existingUserTicketCount) /
      (totalLotTicketCount + newUserTicketCount));

  return Math.round(ticketOdds);
};
