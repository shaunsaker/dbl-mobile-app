import moment from 'moment';

export const getFormattedHoursMinutes = (time: moment.MomentInput): string =>
  moment(time).format('HH:mm');
