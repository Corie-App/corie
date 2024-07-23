import { Logger } from '../utils/logger';
import { ScriptLoader } from '../utils/shared';
import { Announcement } from '../utils/types';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AnnouncementWrapper from '../ui/components/announcement-wrapper';
import { CorieAnalytics } from '../analytics';
import { Env } from '../utils/types';

export class AnnouncementManager {
	constructor(private userId: string, private analytics: CorieAnalytics, private env: Env) {}

	async fetchAndDisplayAnnouncements(): Promise<void> {
		const announcements = await this.fetchAnnouncements();
		this.displayAnnouncements(announcements);
	}

	private async fetchAnnouncements(): Promise<Announcement[]> {
		const scriptId = ScriptLoader.getScriptId();
		const apiUrl = `${this.env.url}/api/announcements?scriptId=${scriptId}&userId=${this.userId}`;

		try {
			const response = await fetch(apiUrl, {
				headers: {
					'X-Referer-Host': window.location.hostname,
					'X-Referer-Pathname': window.location.pathname,
					'X-Script-Token': this.env.token,
				},
			});
			if (!response.ok) {
				throw new Error('Error fetching announcements');
			}
			const data = (await response.json()) as Announcement[];
			console.log({ data });
			return data;
		} catch (error) {
			Logger.log('Error fetching announcements: ' + error);
			return [];
		}
	}

	private displayAnnouncements(announcements: Announcement[]): void {
		const container = document.createElement('div');
		container.className = 'corie-root';
		document.body.appendChild(container);

		const root = createRoot(container);

		const handleClose = () => {
			root.unmount();
			container.remove();
		};

		root.render(
			React.createElement(AnnouncementWrapper, {
				analytics: this.analytics,
				announcements: announcements,
				onClose: handleClose,
			})
		);
	}
}
