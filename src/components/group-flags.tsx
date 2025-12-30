import Flag from '@/components/flag';

type GroupFlagsProps = {
	countries: string[];
	width?: number;
};

const GroupFlags = ({ countries, width }: GroupFlagsProps) => {
	const maxSideLength = Math.min(3, Math.floor(Math.sqrt(countries.length)));

	return (
		<div className='h-full w-full grid' style={{ gridTemplateColumns: `repeat(${maxSideLength}, minmax(0, 1fr))` }}>
			{countries.slice(0, maxSideLength * maxSideLength).map((country, index) => (
				<div key={index} className='h-full w-full relative'>
					<Flag code={country} ratio='4x3' width={width ? width / maxSideLength : undefined} rounded={false} />
				</div>
			))}
		</div>
	);
};

export default GroupFlags;
