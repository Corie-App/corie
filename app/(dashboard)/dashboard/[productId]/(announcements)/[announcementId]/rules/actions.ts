'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import {
	ClearSchedulingRulesSchema,
	RestorePathRulesSchema,
	SaveDevicesRulesSchema,
	SaveGelocationRulesSchema,
	SavePathRulesSchema,
	SaveSchedulingRulesSchema,
} from '@/schemas/announcement/rules';
import { revalidatePath } from 'next/cache';
import { kv } from '@vercel/kv';
import { splitPaths } from '@/lib/split-paths';
import { ZSAError } from 'zsa';
import { checkForRuleConflicts } from '@/lib/check-rule-conflicts';

export const saveGeolocationRulesAction = isProductAdminProcedure
	.createServerAction()
	.input(SaveGelocationRulesSchema)
	.handler(async ({ input }) => {
		const geoLocationRule = JSON.stringify({ countries: input.countries });
		await kv.hset(`rules:${input.announcementId}`, { geolocation: geoLocationRule });
		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/rules`);
		return { success: true };
	});

export const savePathRulesAction = isProductAdminProcedure
	.createServerAction()
	.input(SavePathRulesSchema, { type: 'formData' })
	.handler(async ({ input }) => {
		const allowlist = splitPaths(input.allowlist);
		const blocklist = splitPaths(input.blocklist);
		const ruleConflict = checkForRuleConflicts(allowlist, blocklist);

		if (ruleConflict) throw new ZSAError('CONFLICT', JSON.stringify({ ruleConflict }));

		const rulesString = JSON.stringify({ allowlist, blocklist });
		const rulesWithTs = JSON.stringify({ allowlist, blocklist, ts: Date.now() });
		await kv.hset(`rules:${input.announcementId}`, { paths: rulesString });

		await kv.lpush(`rules:${input.announcementId}:paths:history`, rulesWithTs);
		await kv.ltrim(`rules:${input.announcementId}:paths:history`, 0, 9);

		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/rules`);
		return { success: true };
	});

export const restorePathRulesAction = isProductAdminProcedure
	.createServerAction()
	.input(RestorePathRulesSchema)
	.handler(async ({ input }) => {
		const allowlist = splitPaths(input.allowlist);
		const blocklist = splitPaths(input.blocklist);

		const rulesString = JSON.stringify({ allowlist, blocklist });
		await kv.hset(`rules:${input.announcementId}`, { paths: rulesString });

		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/rules`);
		return { success: true };
	});

export const saveSchedulingRulesAction = isProductAdminProcedure
	.createServerAction()
	.input(SaveSchedulingRulesSchema, { type: 'formData' })
	.handler(async ({ input }) => {
		if (input.endDateType === 'date' && input.endDate && input.endDate < input.startDate)
			throw new ZSAError('ERROR', 'End date must be after start date');

		const rulesString = JSON.stringify({
			startDate: input.startDate.toISOString(),
			endDate: input.endDate ? input.endDate.toISOString() : undefined,
			duration: input.duration,
		});

		await kv.hset(`rules:${input.announcementId}`, { schedule: rulesString });
		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/rules`);
		return { success: true };
	});

export const clearSchedulingRulesAction = isProductAdminProcedure
	.createServerAction()
	.input(ClearSchedulingRulesSchema)
	.handler(async ({ input }) => {
		await kv.hdel(`rules:${input.announcementId}`, 'schedule');
		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/rules`);
		return { success: true };
	});

export const saveDeviceRulesAction = isProductAdminProcedure
	.createServerAction()
	.input(SaveDevicesRulesSchema)
	.handler(async ({ input }) => {
		const deviceRule = JSON.stringify({ targetDevices: input.devices });
		await kv.hset(`rules:${input.announcementId}`, { devices: deviceRule });

		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/rules`);
		return { success: true };
	});
