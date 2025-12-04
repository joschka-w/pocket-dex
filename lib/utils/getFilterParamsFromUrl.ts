import { filterParsers, filterUrlKeys } from '../filters/filterConfig';

// Extracts only the url state that is relevant to the filters
function getFilterParamsFromUrl(params: { [key: string]: string | string[] | undefined }) {
  return Object.fromEntries(
    Object.entries(params).filter(([key]) => {
      if (key in filterUrlKeys) return false;
      return key in filterParsers || Object.values(filterUrlKeys).includes(key);
    })
  );
}

export default getFilterParamsFromUrl;
