export type Entity = 'product' | 'announcement';
export type ButtonStyle = 'flat' | 'curved' | 'pill';
export type Layout = 'default' | 'image-left' | 'image-top';
export type AnnouncementDuration = '1h' | '1d' | '1w' | '1m';

export type RulesKvResponse = {
	geolocation: {
		countries: string[];
	};
	paths: {
		allowlist: string[];
		blocklist: string[];
	};
	schedule: {
		startDate: string;
		endDate?: string;
		duration?: AnnouncementDuration;
	};
};

export type RuleConflict = {
	type: 'allowlist' | 'blocklist';
	allowRule: string;
	blockRule: string;
};
