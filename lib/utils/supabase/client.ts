import { Database } from '@/types/database';
import { createBrowserClient } from '@supabase/ssr';

interface CreateClientOptions {
  fetchOptions?: RequestInit;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = (options: CreateClientOptions = {}) =>
  createBrowserClient<Database>(supabaseUrl!, supabaseKey!, {
    global: {
      fetch: (url, init) => {
        const mergedInit: RequestInit = { ...init, ...options.fetchOptions };

        return fetch(url, mergedInit);
      },
    },
  });
