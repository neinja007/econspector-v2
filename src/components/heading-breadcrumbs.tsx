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
import Link from 'next/link';
import { Fragment } from 'react';

export const HeadingBreadcrumbs = () => {
	const pathname = usePathname();
	const parentRoute = sidebarRoutes.find((route) => route.routes.some((r) => pathMatches(pathname, r.href)));
	const childRoute = parentRoute?.routes.find((r) => pathMatches(pathname, r.href));

	const childBreadcrumbs = childRoute?.getBreadcrumbs?.(pathname.split(childRoute.href)[1]) || [];

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
						<BreadcrumbLink asChild>
							<Link href={childRoute?.href || '/'} className='flex items-center gap-1.5'>
								{childBreadcrumb}
							</Link>
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>
				{childBreadcrumbs.length > 0 &&
					childBreadcrumbs.map((breadcrumb, i) => (
						<Fragment key={breadcrumb.label}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{i === childBreadcrumbs.length - 1 ? (
									<BreadcrumbPage className='flex items-center gap-1.5'>
										{breadcrumb.icon && <breadcrumb.icon className='size-5' />} {breadcrumb.label}
									</BreadcrumbPage>
								) : breadcrumb.href ? (
									<BreadcrumbLink asChild>
										<Link href={breadcrumb.href || '/'} className='flex items-center gap-1.5'>
											{breadcrumb.icon && <breadcrumb.icon className='size-5' />} {breadcrumb.label}
										</Link>
									</BreadcrumbLink>
								) : (
									<>
										{breadcrumb.icon && <breadcrumb.icon className='size-5' />} {breadcrumb.label}
									</>
								)}
							</BreadcrumbItem>
						</Fragment>
					))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
