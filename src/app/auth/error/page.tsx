import { AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';

import { Alert } from '@/components/shadcn/ui/alert';
import Link from 'next/link';

export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
	const params = await searchParams;

	return (
		<Alert variant='destructive'>
			<AlertTitle>Something went wrong.</AlertTitle>
			<AlertDescription>
				{params?.error ? <span>Error code: {params.error}</span> : <span>An unspecified error occurred.</span>} Please
				contact support on the{' '}
				<Link href='/support/report-issue' className='text-blue-500 underline'>
					Support &gt; Report a Problem
				</Link>{' '}
				page if the problem persists.
			</AlertDescription>
		</Alert>
	);
}
