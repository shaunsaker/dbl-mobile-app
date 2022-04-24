export const getTicketOdds = ({
  newUserTicketCount,
  existingUserTicketCount,
  totalLotTicketCount,
}: {
  newUserTicketCount: number;
  existingUserTicketCount: number;
  totalLotTicketCount: number;
}): number => {
  if (!newUserTicketCount) {
    return 0;
  }

  if (!newUserTicketCount && !existingUserTicketCount) {
    return 0;
  }

  if (!totalLotTicketCount) {
    return 1;
  }

  const newTotalTicketCount = totalLotTicketCount + 1;

  const ticketOdds = Math.round(
    newTotalTicketCount / (newUserTicketCount + existingUserTicketCount),
  );

  return ticketOdds;
};
