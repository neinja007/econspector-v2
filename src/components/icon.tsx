'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

const EconSpectorIcon = () => {
	const { resolvedTheme } = useTheme();
	return (
		<div className='size-10 relative'>
			<Image
				src={resolvedTheme === 'dark' ? '/icons/water_dark.svg' : '/icons/water_light.svg'}
				alt='EconSpector Water'
				width={40}
				height={40}
				className='absolute top-0 left-0'
			/>
			<Image
				src='/icons/coloured_land/green.svg'
				alt='EconSpector Land'
				width={40}
				height={40}
				className='absolute top-0 left-0 hue-rotate-30 shadow-md shadow-green-500 rounded-full'
			/>
		</div>
	);
};

export default EconSpectorIcon;
