import { objectToArray } from '../../utils/objectToArray';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { LotId } from '../lots/models';
import { ApplicationState } from '../reducers';
import { TicketId } from '../tickets/models';
import { InvoiceId, InvoiceStatus } from './models';

export const selectInvoicesDataLoading = (state: ApplicationState) => {
  return state.invoices.loading;
};

export const selectInvoiceById = (state: ApplicationState, id: InvoiceId) => {
  if (!state.invoices.data) {
    return null;
  }

  return state.invoices.data[id];
};

export const selectInvoicesByLotId = (
  state: ApplicationState,
  lotId: LotId,
) => {
  if (!state.invoices.data) {
    return [];
  }

  const invoices = state.invoices.data;
  const invoicesArray = objectToArray(invoices);
  const lotInvoices = invoicesArray.filter(invoice => invoice.lotId === lotId);
  const sortedLotInvoices = sortArrayOfObjectsByKey(lotInvoices, 'dateCreated');

  return sortedLotInvoices;
};

export const selectHasTicketsForLotId = (
  state: ApplicationState,
  lotId: LotId,
) => {
  const invoices = selectInvoicesByLotId(state, lotId);

  // if a user has at least one invoice, they have tickets
  const hasTickets = Boolean(invoices.length);

  return hasTickets;
};

export const selectTicketIdsByLotId = (
  state: ApplicationState,
  lotId: LotId,
) => {
  const invoices = selectInvoicesByLotId(state, lotId);
  let ticketIds: TicketId[] = [];

  invoices.forEach(invoice => {
    ticketIds = [...ticketIds, ...invoice.ticketIds];
  });

  return ticketIds;
};

export const selectTicketIdsByLotIdGroupedByStatus = (
  state: ApplicationState,
  lotId: LotId,
) => {
  const invoices = selectInvoicesByLotId(state, lotId);
  const groups: { [key: string]: TicketId[] } = {
    [InvoiceStatus.reserved]: [],
    [InvoiceStatus.paymentReceived]: [],
    [InvoiceStatus.confirmed]: [],
    [InvoiceStatus.expired]: [],
  };

  invoices.forEach(invoice => {
    if (invoice.status === InvoiceStatus.reserved) {
      groups[InvoiceStatus.reserved] = [
        ...groups[InvoiceStatus.reserved],
        ...invoice.ticketIds,
      ];
    } else if (invoice.status === InvoiceStatus.paymentReceived) {
      groups[InvoiceStatus.paymentReceived] = [
        ...groups[InvoiceStatus.paymentReceived],
        ...invoice.ticketIds,
      ];
    } else if (invoice.status === InvoiceStatus.confirmed) {
      groups[InvoiceStatus.confirmed] = [
        ...groups[InvoiceStatus.confirmed],
        ...invoice.ticketIds,
      ];
    } else if (invoice.status === InvoiceStatus.expired) {
      groups[InvoiceStatus.expired] = [
        ...groups[InvoiceStatus.expired],
        ...invoice.ticketIds,
      ];
    }
  });

  return groups;
};
