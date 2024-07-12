export type Entity = 'product' | 'announcement';
export type ButtonStyle = 'flat' | 'curved' | 'pill';
export type Layout = 'default' | 'image-left' | 'image-top';

export type RulesKvResponse = {
	geolocation: {
		countries: string[];
	};
	paths: {
		allowlist: string[];
		blocklist: string[];
	};
};

export type RuleConflict = {
	type: 'allowlist' | 'blocklist';
	allowRule: string;
	blockRule: string;
};
