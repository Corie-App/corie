import { z } from 'zod';

export const CreateAnnouncementSchema = z.object({
	title: z.string(),
	description: z.string(),
	productId: z.string(),
});

export const ToggleAnnouncementActiveSchema = z.object({
	isActive: z.boolean(),
	productId: z.string(),
	announcementId: z.string(),
});

export const UpdateAnnouncementSchema = CreateAnnouncementSchema.extend({
	announcementId: z.string(),
});
