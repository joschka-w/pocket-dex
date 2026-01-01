import { Tables } from '@/types/database';
import { User } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const userAtom = atom<User | null>(null);
export const profileAtom = atom<Tables<'profile'> | null>(null);
export const authLoadingAtom = atom<boolean>(true);
