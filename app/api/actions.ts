'use server';

import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const matchDomain = createServerAction()
	.input(z.object({ scriptId: z.string(), hostname: z.string() }))
	.handler(async ({ input }) => {
		const data = await db.query.products.findFirst({
			where: eq(products.scriptId, input.scriptId),
		});

		if (!data) return { found: null, error: 'Script not found' };
		if (data.domain !== input.hostname) return { found: null, error: 'Domain does not match' };
		return { found: true, error: null };
	});

export const getAnnouncements = createServerAction()
	.input(z.object({ scriptId: z.string() }))
	.handler(async ({ input }) => {
		const data = await db
			.select()
			.from(announcements)
			.leftJoin(products, eq(announcements.productId, products.id))
			.where(and(eq(products.scriptId, input.scriptId), eq(announcements.isActive, true)))
			.execute();

		console.log({ data });
		return {
			announcements: data.map((a) => ({
				title: a.announcements.title,
				content: a.announcements.description,
			})),
		};
	});
