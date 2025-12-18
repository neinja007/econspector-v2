import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';
import { CheckCircleIcon } from 'lucide-react';

export default function Page() {
	return (
		<Alert variant='default'>
			<CheckCircleIcon className='h-4 w-4' />
			<AlertTitle>You have successfully signed up.</AlertTitle>
			<AlertDescription>Please check your email to confirm your account.</AlertDescription>
		</Alert>
	);
}
