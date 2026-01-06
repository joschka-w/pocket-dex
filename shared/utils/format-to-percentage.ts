export function toPercentage(value: number) {
  return value.toLocaleString('en', {
    style: 'percent',
    notation: 'compact',
    trailingZeroDisplay: 'stripIfInteger',
    minimumFractionDigits: 2,
  });
}
