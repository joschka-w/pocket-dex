import { PostgrestSingleResponse } from '@supabase/supabase-js';

// Helper type to get the actual type of the data out of PostgrestSingleResponse
export type ExtractQueryData<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (...args: any[]) => Promise<PostgrestSingleResponse<unknown>>,
> = Awaited<ReturnType<F>>['data'];
