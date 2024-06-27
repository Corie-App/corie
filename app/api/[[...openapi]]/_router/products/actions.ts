import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const matchDomain = createServerAction()
	.input(z.object({ scriptId: z.string(), hostname: z.string() }))
	.handler(async ({ input, request }) => {
		const headersList = headers();
		const referer = headersList.get('referer');

		const data = await db.query.products.findFirst({
			where: eq(products.scriptId, input.scriptId),
		});

		console.log({ referer, request });
		if (!data) return { found: null, error: 'Script not found' };
		if (data.domain !== input.hostname) return { found: null, error: 'Domain does not match' };
		return { found: true, error: null };
	});
