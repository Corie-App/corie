'use server';

import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { eq } from 'drizzle-orm';
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
		const data = await db.query.products.findFirst({
			where: eq(products.scriptId, input.scriptId),
			with: { announcements: true },
		});

		console.log({ data });
		return { announcements: [], data };
	});
