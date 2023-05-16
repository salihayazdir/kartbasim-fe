import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export default function parseDateTime(dateString: string): string | false {
  dayjs.extend(utc);

  if (dayjs(dateString).isValid())
    return dayjs(dateString).format('D/M/YY HH:mm');
  else return false;
}
