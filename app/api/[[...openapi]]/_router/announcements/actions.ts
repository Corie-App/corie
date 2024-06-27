import { scriptProcedure } from '@/lib/procedures';
import { z } from 'zod';

export const getAnnouncements = scriptProcedure
	.createServerAction()
	.input(z.object({ scriptId: z.string() }))
	.handler(async ({ input }) => {
		console.log({ input });
		return { announcements: [] };
	});
