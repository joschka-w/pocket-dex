type Unit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

export function toRelativeTime(date: Date) {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  const intervalsInSeconds: Record<Unit, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  for (const [unit, secondsInUnit] of Object.entries(intervalsInSeconds)) {
    const diff = Math.floor(diffInSeconds / secondsInUnit);

    if (diff >= 1) {
      return rtf.format(-diff, unit as Unit);
    }
  }

  return 'just now';
}
