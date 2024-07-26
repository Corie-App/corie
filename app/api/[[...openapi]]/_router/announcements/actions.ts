import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { scriptProcedure } from '@/lib/procedures';
import { eq, and } from 'drizzle-orm';
import { headers } from 'next/headers';
import { z } from 'zod';
import { checkDeviceRules, checkGeolocationRules, checkPathRules, checkScheduleRules } from './utils';

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
		const userAgent = headers().get('User-Agent') || '';

		const allowedAnnouncements = await Promise.all(
			data.map(async (el) => {
				// if (process.env.VERCEL_ENV === 'development') return el;

				const [passesGeoRule, passesPathRule, passesScheduleRule, passesDeviceRule] = await Promise.all([
					checkGeolocationRules(el.announcements.id, reqCountry),
					checkPathRules(el.announcements.id, pathname),
					checkScheduleRules(el.announcements.id),
					checkDeviceRules(el.announcements.id, userAgent),
				]);

				return passesGeoRule && passesPathRule && passesScheduleRule && passesDeviceRule ? el : null;
			})
		);

		return allowedAnnouncements
			.filter((a) => a !== null)
			.map((a) => ({
				id: a.announcements.id,
				title: a.announcements.title,
				layout: a.announcements.layout,
				imageUrl: a.announcements.imageUrl,
				description: a.announcements.description,
				buttonStyle: a.announcements.buttonStyle,
				primaryColor: a.announcements.primaryColor,
			}));
	});
