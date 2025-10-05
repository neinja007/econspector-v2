import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, request) => {
	if (process.env.ENABLE_ADMIN_SCRIPTS !== 'true') {
		const { pathname } = request.nextUrl;
		if (pathname.startsWith('/api/admin')) {
			return NextResponse.json(
				{
					message:
						'Admin scripts are not enabled. Please stop trying to access this stuff to ruin my platform, I am simply trying to do good in this world.'
				},
				{
					status: 403
				}
			);
		}

		return NextResponse.next();
	}
});

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)'
	]
};
