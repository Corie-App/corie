import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { scriptProcedure } from '@/lib/procedures';
import { GeolocationKvResponse } from '@/lib/types';
import { kv } from '@vercel/kv';
import { eq, and } from 'drizzle-orm';
import { headers } from 'next/headers';
import { z } from 'zod';

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

		let allowedAnnouncements = [];
		for (const el of data) {
			if (process.env.VERCEL_ENV === 'development') {
				allowedAnnouncements.push(el);
				continue;
			}

			const geoLocationRule = await kv.hget<GeolocationKvResponse>(`rules:${el.announcements.id}`, 'geolocation');
			if (geoLocationRule) {
				const reqCountry = headers().get('X-Vercel-IP-Country');
				console.info(`Checking ${reqCountry} against ${geoLocationRule.countries}`);
				if (reqCountry && geoLocationRule.countries.includes(reqCountry)) {
					allowedAnnouncements.push(el);
				}
			} else allowedAnnouncements.push(el);
		}

		return allowedAnnouncements.map((a) => ({
			title: a.announcements.title,
			layout: a.announcements.layout,
			imageUrl: a.announcements.imageUrl,
			description: a.announcements.description,
			buttonStyle: a.announcements.buttonStyle,
			primaryColor: a.announcements.primaryColor,
		}));
	});
