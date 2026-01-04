import { createBrowserClient } from '@supabase/ssr';
import { DatabaseWithOverrides } from '@/types/db/override-types';

export const supabase = createBrowserClient<DatabaseWithOverrides>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
);
