import { z } from 'zod';

export const SaveGelocationRulesSchema = z.object({
	productId: z.string(),
	announcementId: z.string(),
	countries: z.array(z.string()),
});
