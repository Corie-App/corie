import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { scriptProcedure } from '@/lib/procedures';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { z } from 'zod';

export const matchDomain = scriptProcedure
	.createServerAction()
	.input(z.object({ scriptId: z.string() }))
	.handler(async ({ input }) => {
		const headersList = headers();
		const hostname = headersList.get('X-Referer-Host');
		console.log({ hostname });

		const data = await db.query.products.findFirst({
			where: eq(products.scriptId, input.scriptId),
		});

		if (!data) return { found: null, error: 'Script not found' };
		if (data.domain !== hostname) return { found: null, error: 'Domain does not match' };
		return { found: true, error: null };
	});
