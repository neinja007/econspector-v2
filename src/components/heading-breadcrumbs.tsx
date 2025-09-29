'use client';

import { usePathname } from 'next/navigation';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from './shadcn/ui/breadcrumb';
import { sidebarRoutes } from '@/data/sidebar-routes';
import { pathMatches } from '@/utils/path-matches';
import { TriangleAlert } from 'lucide-react';

export const HeadingBreadcrumbs = () => {
	const pathname = usePathname();
	const parentRoute = sidebarRoutes.find((route) => route.routes.some((r) => pathMatches(pathname, r.href)));
	const childRoute = parentRoute?.routes.find((r) => pathMatches(pathname, r.href));

	const childBreadcrumbs = childRoute?.getBreadcrumbs?.(pathname) || [];

	if (!parentRoute || !childRoute)
		return (
			<Breadcrumb>
				<BreadcrumbList className='text-lg'>
					<BreadcrumbItem>
						<BreadcrumbPage className='flex items-center gap-1.5'>
							<TriangleAlert className='size-5' /> Page not found
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		);

	const childBreadcrumb = (
		<>
			<childRoute.icon className='size-5' /> {childRoute?.label || 'Home'}
		</>
	);

	return (
		<Breadcrumb>
			<BreadcrumbList className='text-lg'>
				<BreadcrumbItem>
					<parentRoute.icon className='size-5' /> {parentRoute?.name || 'Home'}
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					{childBreadcrumbs.length === 0 ? (
						<BreadcrumbPage className='flex items-center gap-1.5'>{childBreadcrumb}</BreadcrumbPage>
					) : (
						<BreadcrumbLink href={childRoute?.href || '/'} className='flex items-center gap-1.5'>
							{childBreadcrumb}
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};
