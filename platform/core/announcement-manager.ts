import { Logger } from '../utils/logger';
import { Announcement } from '../utils/types';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AnnouncementWrapper from '../ui/components/announcement-wrapper';
import { CorieAnalytics } from '../analytics';
import { Env } from '../utils/types';

export class AnnouncementManager {
	constructor(
		private env: Env,
		private userId: string,
		private scriptId: string,
		private analytics: CorieAnalytics
	) {}

	async fetchAndDisplayAnnouncements(): Promise<void> {
		const announcements = await this.fetchAnnouncements();
		this.displayAnnouncements(announcements);
	}

	private fetchAnnouncements(): Promise<Announcement[]> {
		return new Promise((resolve, reject) => {
			const callbackName = `corie_announcements_${Date.now()}`;
			(window as any)[callbackName] = (data: Announcement[]) => {
				delete (window as any)[callbackName];
				resolve(data);
			};

			const script = document.createElement('script');
			script.src = `${this.env.url}/api/announcements?callback=${callbackName}&scriptId=${this.scriptId}&userId=${
				this.userId
			}&host=${encodeURIComponent(window.location.hostname)}&pathname=${encodeURIComponent(
				window.location.pathname
			)}`;
			script.onerror = () => {
				delete (window as any)[callbackName];
				Logger.log('Error fetching announcements');
				resolve([]);
			};
			script.onload = () => {
				setTimeout(() => {
					if ((window as any)[callbackName]) {
						delete (window as any)[callbackName];
						Logger.log('Timeout while fetching announcements');
						resolve([]);
					}
				}, 5000); // 5 second timeout
			};
			document.head.appendChild(script);
		});
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
