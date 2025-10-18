import { useIndicators } from '@/hooks/react-query/queries/use-indicators';
import { IndicatorCategory } from '@/types/indicator-category';
import { IndicatorData } from './indicator-data';
import { Skeleton } from '@/components/shadcn/ui/skeleton';

type IndicatorsProps = {
	category: IndicatorCategory;
	areaName: string;
	areaCode: string;
};

export const Indicators = ({ category, areaName, areaCode }: IndicatorsProps) => {
	const { data: indicators, status } = useIndicators(category.id);

	if (status === 'success' && indicators?.length === 0) {
		return <div>No indicators found</div>;
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
