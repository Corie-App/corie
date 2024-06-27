import { z } from 'zod';

export const CreateAnnouncementSchema = z.object({
	title: z.string(),
	description: z.string(),
	productId: z.string(),
});
