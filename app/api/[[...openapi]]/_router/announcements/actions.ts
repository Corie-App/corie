import { z } from 'zod';
import { createServerAction } from 'zsa';

export const getAnnouncements = createServerAction()
	.input(z.object({ scriptId: z.string() }))
	.handler(async ({ input }) => {
		console.log({ input });
		return { announcements: [] };
	});
