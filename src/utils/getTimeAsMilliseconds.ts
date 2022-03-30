import moment from 'moment';

export const getTimeAsMilliseconds = (time?: moment.MomentInput): number =>
  moment(time).toDate().getTime();
