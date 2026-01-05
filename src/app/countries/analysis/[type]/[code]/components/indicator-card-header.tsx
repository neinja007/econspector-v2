import { CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/ui/select';
import { SimpleTooltip } from '@/components/simple-tooltip';
import { Indicator } from '@/types/db/types/indicators';

type IndicatorCardHeaderProps = {
	indicator: Indicator;
	hasChildren: boolean;
	selectedChild: Indicator | null;
	setSelectedChildId: (id: number | null) => void;
	selectedIndicator: Indicator;
	children: React.ReactNode;
};

export const IndicatorCardHeader = ({
	indicator,
	hasChildren,
	selectedChild,
	setSelectedChildId,
	selectedIndicator,
	children
}: IndicatorCardHeaderProps) => {
	return (
		<CardHeader>
			<CardTitle className='flex items-center gap-2 min-h-8'>
				<SimpleTooltip tooltip={`${indicator.name}${indicator.description ? `: ${indicator.description}` : ''}`}>
					<div className='max-w-[200px] line-clamp-1 leading-5'>{indicator.name}</div>
				</SimpleTooltip>
				{hasChildren && (
					<Select
						value={selectedChild ? selectedChild.id.toString() : undefined}
						onValueChange={(value) => setSelectedChildId(Number(value))}
					>
						<SelectTrigger className='max-w-44 min-w-0' size='sm'>
							<span className='truncate block min-w-0 flex-1'>{selectedIndicator?.name}</span>
						</SelectTrigger>
						<SelectContent>
							{indicator.children.map((child) => (
								<SelectItem key={child.id} value={child.id.toString()}>
									{child.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
				{children}
			</CardTitle>
		</CardHeader>
	);
};
