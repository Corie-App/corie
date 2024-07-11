'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { RestorePathRulesSchema, SaveGelocationRulesSchema, SavePathRulesSchema } from '@/schemas/announcement/rules';
import { revalidatePath } from 'next/cache';
import { kv } from '@vercel/kv';
import { splitPaths } from '@/lib/split-paths';
import { ZSAError } from 'zsa';
import { RuleConflict } from '@/lib/types';

export const saveGeolocationRulesAction = isProductAdminProcedure
	.createServerAction()
	.input(SaveGelocationRulesSchema)
	.handler(async ({ input }) => {
		const geoLocationRule = JSON.stringify({ countries: input.countries });
		await kv.hset(`rules:${input.announcementId}`, { geolocation: geoLocationRule });
		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/rules`);
		return { success: true };
	});

function checkForRuleConflicts(allowlist: string[], blocklist: string[]): RuleConflict | null {
	// Helper function to clean and split paths
	const cleanAndSplit = (path: string) => path.trim().split('/').filter(Boolean);

	for (const allowRule of allowlist) {
		const cleanAllowRule = allowRule.trim();
		const allowParts = cleanAndSplit(cleanAllowRule);

		for (const blockRule of blocklist) {
			const cleanBlockRule = blockRule.trim();
			const blockParts = cleanAndSplit(cleanBlockRule);

			// Skip root path conflicts
			if (cleanAllowRule === '/' || cleanBlockRule === '/') continue;

			// Check if paths overlap
			const minLength = Math.min(allowParts.length, blockParts.length);
			let overlap = true;
			for (let i = 0; i < minLength; i++) {
				if (allowParts[i] !== blockParts[i] && allowParts[i] !== '*' && blockParts[i] !== '*') {
					overlap = false;
					break;
				}
			}

			if (overlap) {
				return {
					type: allowParts.length >= blockParts.length ? 'allowlist' : 'blocklist',
					allowRule: cleanAllowRule,
					blockRule: cleanBlockRule,
				};
			}
		}
	}

	return null; // No conflicts found
}

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
