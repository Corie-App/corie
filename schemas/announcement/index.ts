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

export const UpdateAnnouncementDetailsSchema = CreateAnnouncementSchema.extend({
	announcementId: z.string(),
});

export const UpdateAnnouncementThemeSchema = z.object({
	buttonStyle: z.enum(['flat', 'curved', 'pill']),
	imageUrl: z.string().optional(),
	layout: z.enum(['default', 'image-left', 'image-top']),
	announcementId: z.string(),
	primaryColor: z.string(),
});

export const UpdateAnnouncementButtonsSchema = z.object({
	announcementId: z.string(),
	ctaButtonText: z.string(),
	dismissButtonText: z.string(),
	ctaButtonUrl: z.string().url(),
	showDismissButton: z
		.string()
		.optional()
		.transform((value) => (value === undefined ? false : value === 'on')),
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
	layout: z
		.enum(['default', 'image-left', 'image-top'])
		.describe(
			"The layout of the theme, refers to whether there's no image, an image on the left or an image on the top"
		),
	ctaButtonText: z.string().describe('The text of the call to action button'),
	dismissButtonText: z.string().describe('The text of the dismiss button'),
	showDismissButton: z.boolean().describe('Whether to show the dismiss button'),
});
