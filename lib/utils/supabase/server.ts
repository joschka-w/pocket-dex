import { DB } from '@/types/database';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

interface CreateClientOptions {
  fetchOptions?: RequestInit;
}

export async function createClient(options: CreateClientOptions = {}) {
  const cookieStore = await cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      // ? - Supabase now uses next's custom fetch implementation, so now we can use next's caching with the supabase client
      global: {
        fetch: (url, init) => {
          const mergedInit: RequestInit = { ...init, ...options.fetchOptions };

          return fetch(url, mergedInit);
        },
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
