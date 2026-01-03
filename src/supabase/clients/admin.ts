import { Database } from '@/types/db';
import { createClient } from '@supabase/supabase-js';

export const adminSupabase = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SECRET_KEY!
);
