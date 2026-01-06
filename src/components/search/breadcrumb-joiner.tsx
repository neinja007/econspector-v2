import { Fragment } from 'react/jsx-runtime';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '../shadcn/ui/breadcrumb';
import { LucideIcon } from 'lucide-react';
import { renderIconOrComponent } from '@/utils/render-icon-or-component';

export const BreadcrumbJoiner = ({
	breadcrumbs
}: {
	breadcrumbs: { label: string; icon?: React.ReactNode | LucideIcon }[];
}) => {
	return (
		<Breadcrumb>
			<BreadcrumbList className='flex flex-nowrap items-center overflow-hidden'>
				{breadcrumbs.map((breadcrumb, i) => (
					<Fragment key={breadcrumb.label}>
						{i > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							{i === breadcrumbs.length - 1 ? (
								<BreadcrumbPage
									className='flex items-center gap-1.5 min-w-0 max-w-full truncate'
									style={{ flexShrink: 1 }}
								>
									{breadcrumb.icon &&
										renderIconOrComponent({
											icon: breadcrumb.icon,
											props: { className: 'size-4 shrink-0' }
										})}
									<span className='truncate'>{breadcrumb.label}</span>
								</BreadcrumbPage>
							) : (
								<span className='flex items-center gap-1.5 whitespace-nowrap'>
									{breadcrumb.icon &&
										renderIconOrComponent({
											icon: breadcrumb.icon,
											props: { className: 'size-4 shrink-0' }
										})}
									{breadcrumb.label}
								</span>
							)}
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
