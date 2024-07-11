import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { scriptProcedure } from '@/lib/procedures';
import { eq, and } from 'drizzle-orm';
import { headers } from 'next/headers';
import { z } from 'zod';
import { checkGeolocationRules, checkPathRules } from './utils';

export const getAnnouncements = scriptProcedure
	.createServerAction()
	.input(z.object({ scriptId: z.string() }))
	.handler(async ({ input, request }) => {
		const data = await db
			.select()
			.from(announcements)
			.leftJoin(products, eq(announcements.productId, products.id))
			.where(and(eq(products.scriptId, input.scriptId), eq(announcements.isActive, true)))
			.execute();

		const pathname = headers().get('X-Referer-Pathname');
		const reqCountry = headers().get('X-Vercel-IP-Country');

		console.info({ pathname, reqCountry });
		const allowedAnnouncements = await Promise.all(
			data.map(async (el) => {
				// if (process.env.VERCEL_ENV === 'development') return el;

				const passesGeoRule = await checkGeolocationRules(el.announcements.id, reqCountry);
				if (!passesGeoRule) return null;

				console.info({ aid: el.announcements.id, path: pathname });
				const passesPathRule = await checkPathRules(el.announcements.id, pathname);
				console.info({ passesPathRule });
				return passesPathRule ? el : null;
			})
		);

		return allowedAnnouncements
			.filter((a) => a !== null)
			.map((a) => ({
				title: a.announcements.title,
				layout: a.announcements.layout,
				imageUrl: a.announcements.imageUrl,
				description: a.announcements.description,
				buttonStyle: a.announcements.buttonStyle,
				primaryColor: a.announcements.primaryColor,
			}));
	});
