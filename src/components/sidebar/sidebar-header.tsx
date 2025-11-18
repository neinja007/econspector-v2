'use client';

import { SidebarHeader as SidebarHeaderShadcn } from '@/components/shadcn/ui/sidebar';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export const SidebarHeader = () => {
	const { resolvedTheme } = useTheme();

	return (
		<SidebarHeaderShadcn className='w-full border-b'>
			<div className='flex w-full gap-4 items-center justify-center py-1'>
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
				{/* <Image src='/favicon.ico' alt='EconSpector' width={40} height={40} />{' '} */}
				<div className='flex flex-col'>
					<div className='flex items-baseline justify-between gap-1'>
						<span className='text-2xl font-medium'>EconSpector</span>
						<span className='font-bold text-gray-500'>v2</span>
					</div>
					<div className='text-sm -mt-1'>
						Developed by{' '}
						<Link href='https://neinja.dev' target='_blank' className='text-blue-500 underline'>
							neinja.dev
						</Link>
					</div>
				</div>
			</div>
		</SidebarHeaderShadcn>
	);
};
