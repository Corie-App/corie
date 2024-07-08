'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { SaveGelocationRulesSchema } from '@/schemas/announcement/rules';
import { revalidatePath } from 'next/cache';
import { kv } from '@vercel/kv';

export const saveGeolocationRulesAction = isProductAdminProcedure
	.createServerAction()
	.input(SaveGelocationRulesSchema)
	.handler(async ({ input }) => {
		const geoLocationRule = JSON.stringify({ countries: input.countries });
		await kv.hset(`rules:${input.announcementId}`, { geolocation: geoLocationRule });
		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/rules`);
		return { success: true };
	});
