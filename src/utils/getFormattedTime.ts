import moment from 'moment';

export const getFormattedTime = (time: moment.MomentInput): string =>
  moment(time).format('DD MMM YY - HH:mm');
