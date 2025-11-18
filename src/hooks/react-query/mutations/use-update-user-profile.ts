import { updateUserProfile } from '@/api/users';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUserProfile = () => {
	return useMutation({
		mutationFn: (user: { id: string; name: string; email: string }) => updateUserProfile(user.id, user.name, user.email)
	});
};
