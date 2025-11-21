'use client';

import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
	{
		global: {
			fetch: async (url, options) => {
				const authData = await auth();
				const clerkToken = await authData.getToken({
					template: 'Supabase'
				});

				const headers = new Headers(options?.headers);
				headers.set('Authorization', `Bearer ${clerkToken}`);

				return fetch(url, {
					...options,
					headers
				});
			}
		}
	}
);
