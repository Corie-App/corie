import { BaseInitializer } from './base-initializer';
import { Logger } from '../utils/logger';
import { checkAndUpdateIdentifier, getUserIdentifier } from '../utils/identity';
import { CorieAnalytics } from '../analytics';
import { AnnouncementManager } from './announcement-manager';

export class CorieInitializer extends BaseInitializer {
	private announcementManager: AnnouncementManager | null = null;

	constructor(scriptId: string) {
		super(scriptId);
	}

	protected async initialize(): Promise<void> {
		try {
			Logger.log('Initializing Corie script...');
			await this.fetchEnv();
			if (!this.env) {
				Logger.log('Failed to fetch environment.');
				return;
			}

			const domainRes = await this.matchDomain();
			if (!domainRes.found) {
				Logger.log('Domain not matched.');
				return;
			}

			checkAndUpdateIdentifier();
			const userId = getUserIdentifier();
			this.analytics = new CorieAnalytics(userId, domainRes.country, this.env.url);
			Logger.log('User Identifier: ' + userId);

			this.injectStyles();

			this.announcementManager = new AnnouncementManager(this.env, userId, this.scriptId, this.analytics);
			await this.announcementManager.fetchAndDisplayAnnouncements();
		} catch (error) {
			console.error('Error initializing Corie:', error);
		}
	}
}
