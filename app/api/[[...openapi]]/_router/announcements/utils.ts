import { AnnouncementDuration, RulesKvResponse } from '@/lib/types';
import { kv } from '@vercel/kv';

export async function checkScheduleRules(announcementId: string): Promise<boolean> {
	const scheduleRule = await kv.hget<RulesKvResponse['schedule']>(`rules:${announcementId}`, 'schedule');
	if (!scheduleRule) return true; // No rule means pass

	const now = Date.now();
	const startTime = new Date(scheduleRule.startDate).getTime();
	if (now < startTime) return false;

	const endTime = scheduleRule.endDate
		? new Date(scheduleRule.endDate).getTime()
		: scheduleRule.duration
		? calculateEndTime(startTime, scheduleRule.duration)
		: Infinity;

	return now <= endTime;
}

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
		if (pathMatchesPattern(currentPath, pattern)) {
			return sortedAllowlist.includes(pattern);
		}
	}

	return false;
}

export async function checkDeviceRules(announcementId: string, userAgent: string): Promise<boolean> {
	const deviceRule = await kv.hget<RulesKvResponse['devices']>(`rules:${announcementId}`, 'devices');
	if (!deviceRule || deviceRule.targetDevices.length === 0) return true; // No rule means pass

	const userDevice = categorizeDevice(userAgent);
	return deviceRule.targetDevices.includes(userDevice);
}

function pathMatchesPattern(path: string, pattern: string): boolean {
	const regexPattern = pattern.replace(/\*/g, '.*').replace(/\//g, '\\/');
	return new RegExp(`^${regexPattern}$`).test(path);
}

function calculateEndTime(startTime: number, duration: AnnouncementDuration): number {
	const multipliers: Record<AnnouncementDuration, number> = {
		'1h': 60 * 60 * 1000,
		'1d': 24 * 60 * 60 * 1000,
		'1w': 7 * 24 * 60 * 60 * 1000,
		'1m': 30 * 24 * 60 * 60 * 1000, // Approximate
	};
	return startTime + multipliers[duration];
}

function categorizeDevice(userAgent: string): string {
	const ua = userAgent.toLowerCase();

	if (ua.includes('ipad')) return 'tablet_ipad';
	if (ua.includes('android') && ua.includes('mobile')) return 'mobile_android';
	if (ua.includes('android')) return 'tablet_android';
	if (ua.includes('iphone') || ua.includes('ipod')) return 'mobile_ios';

	if (ua.includes('windows')) return 'desktop_windows';
	if (ua.includes('macintosh') || ua.includes('mac os x')) return 'desktop_macos';
	if (ua.includes('linux')) return 'desktop_linux';

	if (ua.includes('mobile')) return 'other_mobile';
	if (ua.includes('tablet')) return 'other_tablet';

	return 'unknown';
}
