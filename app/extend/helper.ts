import moment from 'moment';

export default {
  transformTime(timestamp: number, FORMATTER: string) {
    return moment(timestamp * 1000).format(FORMATTER);
  },
};
