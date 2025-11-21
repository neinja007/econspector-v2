import { updateUserProfile } from '@/api/users';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUserProfile = () => {
	const isNotUpdated =
		typeof window !== 'undefined' && window.sessionStorage && window.sessionStorage.getItem('updated-user') !== 'true';

	return useMutation({
		mutationFn: isNotUpdated
			? (user: { id: string; name: string; email: string }) => updateUserProfile(user.id, user.name, user.email)
			: undefined,
		onSuccess: () => {
			window.sessionStorage.setItem('updated-user', 'true');
		}
	});
};
