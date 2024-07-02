'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { AIGenerateThemeSchema, GenerateThemeSchema, UpdateAnnouncementThemeSchema } from '@/schemas/announcement';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { chromium } from 'playwright';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';

export const updateAnnouncemenThemetAction = isProductAdminProcedure
	.createServerAction()
	.input(UpdateAnnouncementThemeSchema, { type: 'formData' })
	.handler(async ({ input }) => {
		await db
			.update(announcements)
			.set({ buttonStyle: input.buttonStyle })
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
			const browser = await chromium.launch();
			const page = await browser.newPage();
			await page.goto(`https://${data[0].domain}`, { waitUntil: 'networkidle' });
			const screenshotBuffer = await page.screenshot({ fullPage: true });
			const screenshotBase64 = screenshotBuffer.toString('base64');
			await browser.close();

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
								image: `data:image/png;base64,${screenshotBase64}`,
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
