import dayjs from 'dayjs';

export default function parseDateTime2(dateString: string): string {
  return dayjs(dateString).format('D/M/YY HH:mm');
}
