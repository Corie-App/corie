import { BaseInitializer } from './base-initializer';
import { Logger } from '../utils/logger';
import { ScriptLoader } from '../utils/shared';
import { checkAndUpdateIdentifier, getUserIdentifier } from '../utils/identity';
import { CorieAnalytics } from '../analytics';
import { AnnouncementManager } from './announcement-manager';

export class CorieInitializer extends BaseInitializer {
	private announcementManager: AnnouncementManager | null = null;

	protected async initialize(): Promise<void> {
		try {
			Logger.log('Initializing Corie script...');
			this.scriptId = ScriptLoader.getScriptId();
			if (!this.scriptId) {
				Logger.log('No script ID found.');
				return;
			}
			await this.fetchEnv();
			if (!this.env) {
				Logger.log('Failed to fetch environment.');
				return;
			}

			const domainRes = await this.matchDomain(this.scriptId);
			if (!domainRes.found) {
				Logger.log('Domain not matched.');
				return;
			}

			checkAndUpdateIdentifier();
			const userId = getUserIdentifier();
			this.analytics = new CorieAnalytics(userId, domainRes.country);
			Logger.log('User Identifier: ' + userId);

			this.injectStyles();

			this.announcementManager = new AnnouncementManager(userId, this.analytics, this.env);
			await this.announcementManager.fetchAndDisplayAnnouncements();
		} catch (error) {
			console.error('Error initializing Corie:', error);
		}
	}
}
