import { PostgrestSingleResponse } from '@supabase/supabase-js';

// Helper type to get the actual type of the data out of PostgrestSingleResponse
export type ExtractQueryData<F extends () => Promise<PostgrestSingleResponse<unknown>>> = Awaited<
  ReturnType<F>
>['data'];
