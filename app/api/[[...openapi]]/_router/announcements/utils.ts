import { RulesKvResponse } from '@/lib/types';
import { kv } from '@vercel/kv';

export async function checkGeolocationRules(announcementId: string, reqCountry: string | null): Promise<boolean> {
	const geoLocationRule = await kv.hget<RulesKvResponse['geolocation']>(`rules:${announcementId}`, 'geolocation');
	if (!geoLocationRule || geoLocationRule.countries.length === 0) return true; // No rule means pass
	return reqCountry !== null && geoLocationRule.countries.includes(reqCountry);
}

export async function checkPathRules(announcementId: string, currentPath: string | null): Promise<boolean> {
	if (!currentPath) throw new Error('No current path found in request');

	const pathsRule = await kv.hget<RulesKvResponse['paths']>(`rules:${announcementId}`, 'paths');
	if (!pathsRule) return true; // No rule means pass
	if (pathsRule.allowlist.length === 0 && pathsRule.blocklist.length === 0) return true;

	// Sort patterns from most specific to most general
	const sortPatterns = (patterns: string[]) =>
		patterns.sort((a, b) => b.split('/').length - a.split('/').length || b.length - a.length);

	const sortedAllowlist = sortPatterns(pathsRule.allowlist);
	const sortedBlocklist = sortPatterns(pathsRule.blocklist);

	for (const pattern of [...sortedBlocklist, ...sortedAllowlist]) {
		console.info({ pattern, currentPath, matches: pathMatchesPattern(currentPath, pattern) });
		if (pathMatchesPattern(currentPath, pattern)) {
			return sortedAllowlist.includes(pattern);
		}
	}

	return false;
}

function pathMatchesPattern(path: string, pattern: string): boolean {
	const regexPattern = pattern.replace(/\*/g, '.*').replace(/\//g, '\\/');
	return new RegExp(`^${regexPattern}$`).test(path);
}
