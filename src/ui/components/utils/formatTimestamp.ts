import { getLocaleString } from '@/lib/dateTime';

export default function formatTimestamp(timestamp: string | undefined) {
  return getLocaleString(timestamp, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    hour12: true,
  });
}
