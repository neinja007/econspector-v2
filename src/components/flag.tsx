import { cn } from '@/utils/shadcn/utils';
import Image from 'next/image';

type FlagProps = {
	code: string;
	ratio: '1x1' | '4x3';
	height: number;
	rounded?: boolean;
};

const Flag = ({ code, ratio, height, rounded = true }: FlagProps) => {
	const width = ratio === '1x1' ? height : (height * 4) / 3;

	return (
		<Image
			src={`/flags/${ratio}/${code.toLowerCase()}.svg`}
			alt='flag'
			className={cn('object-cover', rounded && 'rounded-md')}
			width={width}
			height={height}
		/>
	);
};

export default Flag;
