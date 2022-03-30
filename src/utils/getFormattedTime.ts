import moment from 'moment';

// FIXME: this is overly complex and confusing
export const getFormattedTime = (
  time: moment.MomentInput,
  showHours?: boolean,
  showDay?: boolean,
): string =>
  moment(time).format(
    `${showHours ? `HH:MM${showDay ? ' ' : ''}` : ''}${showDay ? 'ddd' : ''}${
      showHours || showDay ? ', ' : ''
    }D MMM YYYY`,
  );
