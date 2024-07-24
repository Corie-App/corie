import { Logger } from '../utils/logger';
import { CorieAnalytics } from '../analytics';
import { Env } from '../utils/types';

export abstract class BaseInitializer {
	protected analytics: CorieAnalytics | null = null;
	protected env: Env | null = null;
	protected scriptId: string | null = null;

	constructor() {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => this.initialize());
		} else {
			this.initialize();
		}
	}

	protected abstract initialize(): Promise<void>;

	protected async fetchEnv(): Promise<void> {
		try {
			if (!this.scriptId) throw new Error('Script ID not available');

			// const baseUrl = 'http://localhost:3000';
			// const baseUrl = 'https://corie.vercel.app';
			// update this 👇🏿 to the preview branch you're on (based on the branch name)
			const baseUrl = 'https://corie-git-gt-codes-cor-20-track-dismisses-for-users-gt-codes.vercel.app';

			const response = await fetch(`${baseUrl}/env`);
			if (!response.ok) {
				throw new Error('Failed to fetch environment variables');
			}
			const data = await response.json();
			this.env = data;
		} catch (error) {
			console.error('Error fetching environment variables:', error);
		}
	}

	protected async matchDomain(scriptId: string): Promise<{ found: boolean; country: string | null }> {
		if (!this.env) {
			throw new Error('Environment not available');
		}

		const apiUrl = `${this.env.url}/api/products/domain?scriptId=${scriptId}`;
		try {
			const response = await fetch(apiUrl, {
				headers: {
					'X-Referer-Host': window.location.hostname,
					'X-Script-Token': this.env.token,
				},
			});
			if (!response.ok) {
				throw new Error('Unauthorized domain or other error');
			}
			const data = await response.json();
			return { found: data.found, country: data.country };
		} catch (error) {
			Logger.log('Error matching domain: ' + error);
			return { found: false, country: null };
		}
	}

	protected injectStyles(): void {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '/platform/ui/styles.css';
		document.head.appendChild(link);
	}
}
