import { z } from 'zod';

const ProductAnnouncementSchema = z.object({
	productId: z.string(),
	announcementId: z.string(),
});

export const SaveGelocationRulesSchema = ProductAnnouncementSchema.extend({
	countries: z.array(z.string()),
});

export const SavePathRulesSchema = ProductAnnouncementSchema.extend({
	allowlist: z.string(),
	blocklist: z.string(),
});

export const RestorePathRulesSchema = SavePathRulesSchema;

export const SaveSchedulingRulesSchema = ProductAnnouncementSchema.extend({
	startDate: z.string().transform((val) => new Date(val)),
	endDate: z
		.string()
		.transform((val) => new Date(val))
		.optional(),
	duration: z.string().optional(),
	endDateType: z.enum(['date', 'duration']),
});
