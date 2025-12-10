import { filterParsers, filterUrlKeys } from '../filters/filterConfig';

// Extracts only the url state that is relevant to the filters
function getFilterParamsFromUrl(
  params: { [key: string]: string | string[] | undefined },
  convertUrlKeys: boolean = false
) {
  const entries = Object.entries(params);

  const filteresEntries = entries.filter(([key]) => {
    if (key in filterUrlKeys) return false;
    return key in filterParsers || Object.values(filterUrlKeys).includes(key);
  });

  // TODO - So ugly, gotta refactor this
  if (convertUrlKeys) {
    const res: {
      [k: string]: string | string[] | undefined;
    } = {};

    filteresEntries.forEach(([entryKey, entryVal]) => {
      const matchedKey = Object.entries(filterUrlKeys).find(([, val]) => val === entryKey);

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
