import { useIndicators } from '@/hooks/react-query/queries/use-indicators';
import { IndicatorCategory } from '@/types/indicator-category';
import { IndicatorData } from './indicator-data';

type IndicatorsProps = {
	category: IndicatorCategory;
	areaName: string;
	areaCode: string;
};

export const Indicators = ({ category, areaName, areaCode }: IndicatorsProps) => {
	const { data: indicators } = useIndicators(category.id);

	if (indicators?.length === 0) {
		return <div>No indicators found</div>;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{indicators?.map((indicator) => (
				<IndicatorData key={indicator.id} indicator={indicator} areaName={areaName} areaCode={areaCode} />
			))}
		</div>
	);
};
