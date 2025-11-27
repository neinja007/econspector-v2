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
import { TriangleAlert, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Spinner } from './shadcn/ui/spinner';
import { renderIconOrComponent } from '@/utils/render-icon-or-component';

export const HeadingBreadcrumbs = () => {
	const pathname = usePathname();
	const parentRoute = useMemo(
		() => sidebarRoutes.find((route) => route.routes.some((r) => pathMatches(pathname, r.href, r.exact))),
		[pathname]
	);
	const childRoute = useMemo(
		() => parentRoute?.routes.find((r) => pathMatches(pathname, r.href, r.exact)),
		[parentRoute, pathname]
	);

	const [childBreadcrumbs, setChildBreadcrumbs] = useState<
		{ label: string; href?: string; icon?: React.ReactNode | LucideIcon }[]
	>([]);

	const [childBreadcrumbsLoading, setChildBreadcrumbsLoading] = useState(false);

	useEffect(() => {
		let canceled = false;
		if (!childRoute) {
			setChildBreadcrumbs([]);
			setChildBreadcrumbsLoading(false);
			return;
		}
		const suffix = pathname.split(childRoute.href)[1];
		const maybe = childRoute.getBreadcrumbs?.(suffix);
		if (maybe instanceof Promise) {
			setChildBreadcrumbsLoading(true);
			maybe.then((res) => {
				if (!canceled) setChildBreadcrumbs(res || []);
				setChildBreadcrumbsLoading(false);
			});
		} else {
			setChildBreadcrumbs(maybe || []);
			setChildBreadcrumbsLoading(false);
		}
		return () => {
			canceled = true;
			setChildBreadcrumbsLoading(false);
		};
	}, [childRoute, pathname]);

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
					{childBreadcrumbs.length === 0 || childBreadcrumbsLoading ? (
						<BreadcrumbPage className='flex items-center gap-1.5'>{childBreadcrumb}</BreadcrumbPage>
					) : (
						<BreadcrumbLink asChild>
							<Link href={childRoute?.href || '/'} className='flex items-center gap-1.5'>
								{childBreadcrumb}
							</Link>
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>
				{childBreadcrumbsLoading && childBreadcrumbs.length === 0 && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<Spinner /> Loading...
						</BreadcrumbItem>
					</>
				)}
				{childBreadcrumbs.length > 0 &&
					childBreadcrumbs.map((breadcrumb, i) => (
						<Fragment key={breadcrumb.label}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{i === childBreadcrumbs.length - 1 ? (
									<BreadcrumbPage className='flex items-center gap-1.5'>
										{breadcrumb.icon &&
											renderIconOrComponent({ icon: breadcrumb.icon, props: { className: 'size-5' } })}
										{breadcrumb.label}
									</BreadcrumbPage>
								) : breadcrumb.href ? (
									<BreadcrumbLink asChild>
										<Link href={breadcrumb.href || '/'} className='flex items-center gap-1.5'>
											{breadcrumb.icon &&
												renderIconOrComponent({ icon: breadcrumb.icon, props: { className: 'size-5' } })}
											{breadcrumb.label}
										</Link>
									</BreadcrumbLink>
								) : (
									<>
										{breadcrumb.icon &&
											renderIconOrComponent({ icon: breadcrumb.icon, props: { className: 'size-5' } })}
										{breadcrumb.label}
									</>
								)}
							</BreadcrumbItem>
						</Fragment>
					))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
