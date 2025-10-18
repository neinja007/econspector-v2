import { useIndicators } from '@/hooks/react-query/queries/use-indicators';
import { IndicatorCategory } from '@/types/indicator-category';
import { IndicatorData } from './indicator-data';
import { Skeleton } from '@/components/shadcn/ui/skeleton';
import { TriangleAlertIcon } from 'lucide-react';

type IndicatorsProps = {
	category: IndicatorCategory;
	areaName: string;
	areaCode: string;
};

export const Indicators = ({ category, areaName, areaCode }: IndicatorsProps) => {
	const { data: indicators, status } = useIndicators(category.id);

	if (status === 'success' && indicators?.length === 0) {
		return (
			<div className='h-full w-full flex items-center justify-center gap-2 mt-10'>
				<TriangleAlertIcon className='size-5' /> No indicators found.
			</div>
		);
	}

	if (status === 'pending') {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				<Skeleton className='h-[315px] w-full' />
				<Skeleton className='h-[315px] w-full' />
				<Skeleton className='h-[315px] w-full' />
			</div>
		);
	}

	if (status === 'error') {
		return <div>Error loading indicators</div>;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{indicators?.map((indicator) => (
				<IndicatorData key={indicator.id} indicator={indicator} areaName={areaName} areaCode={areaCode} />
			))}
		</div>
	);
};
