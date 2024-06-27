import { currentUser } from '@clerk/nextjs/server';
import { createServerActionProcedure } from 'zsa';

export const authenticatedProcedure = createServerActionProcedure().handler(async () => {
	try {
		const user = await currentUser();
		if (!user) throw new Error('User not authenticated');

		return {
			user: {
				id: user.id,
				name: user.fullName,
				email: user.emailAddresses[0].emailAddress,
			},
		};
	} catch {
		throw new Error('There was an error authenticating the user');
	}
});
