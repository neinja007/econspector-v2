import { updateSession } from '@/utils/supabase/middleware';
import { type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
	const response = await updateSession(request);

	// Add pathname to response headers so it's accessible in generateMetadata
	response.headers.set('x-pathname', request.nextUrl.pathname);

	return response;
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
