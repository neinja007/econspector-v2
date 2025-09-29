import Link from 'next/link';

const NotFound = () => {
	return (
		<div className='flex flex-col gap-2'>
			<p>Unfortunately, we couldn&apos;t find the page you were looking for. Select another option from the sidebar.</p>
			<p>
				If you believe this is an error, please raise an issue under{' '}
				<Link href='/support/report-issue' className='text-blue-500 underline'>
					Support &gt; Report a Problem
				</Link>
				.
			</p>
		</div>
	);
};

export default NotFound;
