'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { AIGenerateThemeSchema, GenerateThemeSchema, UpdateAnnouncementThemeSchema } from '@/schemas/announcement';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';

export const updateAnnouncemenThemeAction = isProductAdminProcedure
	.createServerAction()
	.input(UpdateAnnouncementThemeSchema, { type: 'formData' })
	.handler(async ({ input }) => {
		await db
			.update(announcements)
			.set({ buttonStyle: input.buttonStyle, primaryColor: input.primaryColor })
			.where(eq(announcements.id, input.announcementId))
			.returning({ id: announcements.id });

		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/theme`);
		return { success: true };
	});

export const generateThemeAction = isProductAdminProcedure
	.createServerAction()
	.input(GenerateThemeSchema)
	.handler(async ({ input }) => {
		const data = await db
			.select({ domain: products.domain })
			.from(products)
			.where(eq(products.id, input.productId));

		if (!data.length) throw new Error('Product not found');
		if (!data[0].domain) throw new Error('No domain found');

		try {
			const res = await fetch(`https://api.microlink.io/?url=https://${data[0].domain}&screenshot`).then(
				(res) => res.json() as Promise<{ data: { screenshot: { url: string } } }>
			);

			const { object } = await generateObject({
				model: openai('gpt-4o'),
				schema: AIGenerateThemeSchema,
				messages: [
					{
						role: 'user',
						content: [
							{
								type: 'text',
								text: 'You are a website auditor. You are given a screenshot of a website and you need to generate a theme for the website. The screenshot is attached to the message.',
							},
							{
								type: 'image',
								image: res.data.screenshot.url,
							},
						],
					},
				],
			});
			console.log({ domain: data[0].domain, recommendedTheme: object });
			return object;
		} catch (error) {
			console.error('Error taking screenshot:', error);
		}
	});
