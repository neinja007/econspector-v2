import { DatabaseWithOverrides } from '@/types/db/override-types';
import { createClient } from '@supabase/supabase-js';

export const adminSupabase = createClient<DatabaseWithOverrides>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SECRET_KEY!
);
