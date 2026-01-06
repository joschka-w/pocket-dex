import { SingleParserBuilder, UrlKeys } from 'nuqs/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Options<T extends Record<string, any>> {
  urlKeys?: UrlKeys<T>;
  convertUrlKeys?: boolean;
}

// Extracts only the url state that is relevant to the filters
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFilterParamsFromUrl<T extends Record<string, SingleParserBuilder<any>>>(
  params: { [key: string]: string | string[] | undefined },
  parsers: T,
  options?: Options<T>,
) {
  const entries = Object.entries(params);

  const urlKeys = options?.urlKeys || {};

  const filteresEntries = entries.filter(([key]) => {
    if (key in urlKeys) return false;
    return key in parsers || Object.values(urlKeys).includes(key);
  });

  // TODO - So ugly, gotta refactor this
  if (options?.convertUrlKeys) {
    const res: {
      [k: string]: string | string[] | undefined;
    } = {};

    filteresEntries.forEach(([entryKey, entryVal]) => {
      const matchedKey = Object.entries(urlKeys).find(([, val]) => val === entryKey);

      if (matchedKey) {
        const [stateKey] = matchedKey;

        res[stateKey] = entryVal;
      } else {
        res[entryKey] = entryVal;
      }
    });

    return res;
  }

  return Object.fromEntries(filteresEntries);
}

export default getFilterParamsFromUrl;
