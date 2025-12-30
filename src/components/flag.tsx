import { cn } from '@/utils/shadcn/utils';
import Image from 'next/image';

type FlagProps = {
	code: string;
	ratio: '1x1' | '4x3';
	width?: number;
	rounded?: boolean;
};

const Flag = ({ code, ratio, width, rounded = true }: FlagProps) => {
	const height = width ? (ratio === '1x1' ? width : (width * 3) / 4) : undefined;

	return (
		<Image
			src={`/flags/${ratio}/${code.toUpperCase()}.svg`}
			alt='flag'
			className={cn('object-cover', rounded && 'rounded-md')}
			width={width}
			height={height}
			fill={!width && !height}
		/>
	);
};

export default Flag;
