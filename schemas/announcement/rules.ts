import { z } from 'zod';

export const SaveGelocationRulesSchema = z.object({
	productId: z.string(),
	announcementId: z.string(),
	countries: z.array(z.string()),
});

export const SavePathRulesSchema = z.object({
	productId: z.string(),
	announcementId: z.string(),
	allowlist: z.string(),
	blocklist: z.string(),
});

export const RestorePathRulesSchema = SavePathRulesSchema;
