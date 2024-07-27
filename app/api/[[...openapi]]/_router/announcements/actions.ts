import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { scriptProcedure } from '@/lib/procedures';
import { eq, and } from 'drizzle-orm';
import { headers } from 'next/headers';
import { z } from 'zod';
import { checkDeviceRules, checkGeolocationRules, checkPathRules, checkScheduleRules } from './utils';

const AnnouncementsSchema = z.object({
	scriptId: z.string(),
	callback: z.string().optional(),
	userId: z.string(),
	host: z.string(),
	pathname: z.string(),
});

export const getAnnouncements = scriptProcedure
	.createServerAction()
	.input(AnnouncementsSchema)
	.handler(async ({ input }) => {
		const data = await db
			.select()
			.from(announcements)
			.leftJoin(products, eq(announcements.productId, products.id))
			.where(and(eq(products.scriptId, input.scriptId), eq(announcements.isActive, true)))
			.execute();

		const reqCountry = headers().get('X-Vercel-IP-Country');
		const userAgent = headers().get('User-Agent') || '';

		const allowedAnnouncements = await Promise.all(
			data.map(async (el) => {
				const [passesGeoRule, passesPathRule, passesScheduleRule, passesDeviceRule] = await Promise.all([
					checkGeolocationRules(el.announcements.id, reqCountry),
					checkPathRules(el.announcements.id, input.pathname),
					checkScheduleRules(el.announcements.id),
					checkDeviceRules(el.announcements.id, userAgent),
				]);

				return passesGeoRule && passesPathRule && passesScheduleRule && passesDeviceRule ? el : null;
			})
		);

		const result = allowedAnnouncements
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

		if (input.callback) {
			return new Response(`${input.callback}(${JSON.stringify(result)})`, {
				headers: { 'Content-Type': 'application/javascript' },
			});
		} else return result;
	});
