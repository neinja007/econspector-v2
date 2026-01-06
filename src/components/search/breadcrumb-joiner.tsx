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
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb, i) => (
					<Fragment key={breadcrumb.label}>
						{i > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							{i === breadcrumbs.length - 1 ? (
								<BreadcrumbPage className='flex items-center gap-1.5'>
									{breadcrumb.icon && renderIconOrComponent({ icon: breadcrumb.icon, props: { className: 'size-4' } })}
									{breadcrumb.label}
								</BreadcrumbPage>
							) : (
								<>
									{breadcrumb.icon && renderIconOrComponent({ icon: breadcrumb.icon, props: { className: 'size-4' } })}{' '}
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
