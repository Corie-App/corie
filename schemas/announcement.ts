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

export const UpdateAnnouncementThemeSchema = z.object({
	buttonStyle: z.enum(['flat', 'curved', 'pill']),
	announcementId: z.string(),
});

export const GenerateThemeSchema = z.object({
	productId: z.string(),
});

export const AIGenerateThemeSchema = z.object({
	primaryColor: z
		.string()
		.describe(
			'The primary color of the theme, will be used for the background of the button. Should be a 7 character hex code'
		),
	buttonStyle: z
		.enum(['flat', 'curved', 'pill'])
		.describe('The button style of the theme, refers to the radius of the button'),
});
