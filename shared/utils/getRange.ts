export function getRange(page: number, limit: number): [number, number] {
  const from = page * limit;
  const to = from + limit - 1;

  return [from, to];
}
