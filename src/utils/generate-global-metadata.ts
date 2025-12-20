import { sidebarRoutes } from '@/data/sidebar-routes';
import { slogan } from '@/data/slogan';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { pathMatches } from './path-matches';

export const generateGlobalMetadata = async (): Promise<Metadata> => {
	const headersList = await headers();
	const pathname = headersList.get('x-pathname') || '';

	if (!pathname) return { title: 'EconSpector v2', description: slogan };

	const parentRoute = sidebarRoutes.find((route) => route.routes.some((r) => pathMatches(pathname, r.href, r.exact)));
	const routeLabels: string[] = parentRoute ? [parentRoute.name] : [];

	if (parentRoute) {
		const childRoute = parentRoute.routes.find((r) => pathMatches(pathname, r.href, r.exact));

		if (childRoute) {
			const suffix = pathname.split(childRoute.href)[1];
			routeLabels.push(childRoute.label);
			const maybe = childRoute.getBreadcrumbs?.(suffix);

			if (maybe instanceof Promise) {
				const breadcrumbs = await maybe;
				const lastBreadcrumb = breadcrumbs?.at(-1);

				if (lastBreadcrumb) {
					routeLabels.push(lastBreadcrumb.label);
				}
			}
		}
	}

	if (!routeLabels.length) return { title: 'EconSpector v2', description: slogan };
	// const full_title = routeLabels.join(' - ') + ' | EconSpector v2';
	const short_fragment = routeLabels.slice(1).join(' - ');
	const shorter_title =
		short_fragment + (short_fragment.toLowerCase().indexOf('econspector') !== -1 ? '' : ' | EconSpector v2');
	return {
		title: shorter_title,
		description: slogan
	};
};
