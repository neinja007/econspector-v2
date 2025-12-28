import { AbbreviationText } from '@/components/abbreviation-text';
import { Button } from '@/components/shadcn/ui/button';
import { CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/ui/select';
import { SimpleTooltip } from '@/components/simple-tooltip';
import { Indicator } from '@/types/indicator';
import { Expand } from 'lucide-react';

type IndicatorCardHeaderProps = {
	indicator: Indicator;
	hasChildren: boolean;
	selectedChildId: number | null;
	setSelectedChildId: (id: number | null) => void;
	selectedIndicator: Indicator;
	setIsExpanded: (expanded: boolean) => void;
};

export const IndicatorCardHeader = ({
	indicator,
	hasChildren,
	selectedChildId,
	setSelectedChildId,
	selectedIndicator,
	setIsExpanded
}: IndicatorCardHeaderProps) => {
	return (
		<CardHeader>
			<CardTitle className='flex items-center gap-2 min-h-8'>
				<div className='max-w-[200px] line-clamp-1 leading-5'>
					{indicator.description ? (
						<SimpleTooltip tooltip={indicator.description}>{indicator.name}</SimpleTooltip>
					) : (
						indicator.name
					)}
				</div>
				{hasChildren && (
					<Select
						value={selectedChildId?.toString() ?? undefined}
						onValueChange={(value) => setSelectedChildId(Number(value))}
					>
						<SelectTrigger className='w-fit' size='sm'>
							<AbbreviationText text={selectedIndicator?.name} cursorPointer={true} />
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
				<Button size='icon-sm' className='ml-auto' variant='ghost' onClick={() => setIsExpanded(true)}>
					<Expand />
				</Button>
			</CardTitle>
		</CardHeader>
	);
};
