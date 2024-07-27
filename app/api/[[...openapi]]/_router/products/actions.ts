import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { scriptProcedure } from '@/lib/procedures';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { z } from 'zod';

const DomainSchema = z.object({
	scriptId: z.string(),
	host: z.string().optional(),
	callback: z.string().optional(),
});

export const matchDomain = scriptProcedure
	.createServerAction()
	.input(DomainSchema)
	.handler(async ({ input }) => {
		const headersList = headers();
		const hostname = headersList.get('X-Referer-Host');
		const reqCountry = headers().get('X-Vercel-IP-Country');
		console.info(`Loading script from ${hostname}`);

		const data = await db.query.products.findFirst({
			where: eq(products.scriptId, input.scriptId),
		});

		const result = { found: false, error: null as string | null, country: null as string | null };

		if (!data) result.error = 'Script not found';
		else if (data.domain !== hostname && data.domain !== input.host) result.error = 'Domain does not match';
		else {
			result.found = true;
			result.country = reqCountry;
		}

		if (input.callback) {
			return new Response(`${input.callback}(${JSON.stringify(result)})`, {
				headers: {
					'Content-Type': 'application/javascript',
				},
			});
		} else return result;
	});
