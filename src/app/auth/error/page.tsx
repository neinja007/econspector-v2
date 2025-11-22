export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
	const params = await searchParams;

	return (
		<div className='text-xl'>
			Sorry, something went wrong.{' '}
			{params?.error ? <span>Error code: {params.error}</span> : <span>An unspecified error occurred.</span>}
		</div>
	);
}
