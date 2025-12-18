'use client';

import { cn } from '@/utils/shadcn/utils';
import { Button } from '@/components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import { useState } from 'react';
import { supabase } from '@/supabase/clients/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';
import { CheckCircle } from 'lucide-react';

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(true);

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			setSuccess(true);
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
			{success ? (
				<Alert variant='default'>
					<CheckCircle className='size-5' />
					<AlertTitle className='text-xl'>Password Updated</AlertTitle>
					<AlertDescription>
						Your password has been updated successfully. Feel free to leave this page.
					</AlertDescription>
				</Alert>
			) : (
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>Reset Your Password</CardTitle>
						<CardDescription>Please enter your new password below.</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleForgotPassword}>
							<div className='flex flex-col gap-6'>
								<div className='grid gap-2'>
									<Label htmlFor='password'>New password</Label>
									<Input
										id='password'
										type='password'
										placeholder='New password'
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								{error && <p className='text-sm text-red-500'>{error}</p>}
								<Button type='submit' className='w-full' disabled={isLoading}>
									{isLoading ? 'Saving...' : 'Save new password'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
