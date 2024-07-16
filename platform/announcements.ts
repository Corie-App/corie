import { Logger } from './logger.js';
import { ScriptLoader } from './shared.js';
import { Announcement } from './types.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AnnouncementWrapper from './ui/components/announcement-wrapper.jsx';
import { CorieAnalytics } from './analytics/index.js';

export async function fetchAnnouncements(userId: string, analytics: CorieAnalytics): Promise<void> {
	// displayAnnouncements([]);
	// return;
	const scriptId = ScriptLoader.getScriptId();
	const apiUrl = `/api/announcements?scriptId=${scriptId}&userId=${userId}`;
	// const apiUrl = `https://corie-git-gt-codes-cor-10-create-a-script-that-a8dc35-gt-codes.vercel.app/api/announcements?scriptId=${scriptId}`;
	try {
		const response = await fetch(apiUrl, {
			headers: {
				'X-Referer-Host': window.location.hostname,
				'X-Referer-Pathname': window.location.pathname,
				'X-Script-Secret': 'g5uUhoGtwaqG0m8y9wLjmhCPEnx5tOs1JS5CDgU+ifM=',
			},
		});
		if (!response.ok) {
			throw new Error('Error fetching announcements');
		}
		const data = (await response.json()) as Announcement[];
		displayAnnouncements(data, analytics);
	} catch (error) {
		Logger.log('Error fetching announcements: ' + error);
	}
}

function displayAnnouncements(data: Announcement[], analytics: CorieAnalytics): void {
	const container = document.createElement('div');
	container.className = 'corie-root ';
	document.body.appendChild(container);

	const root = createRoot(container);

	const handleClose = () => {
		root.unmount();
		container.remove();
	};

	root.render(
		React.createElement(AnnouncementWrapper, {
			analytics,
			announcements: data,
			onClose: handleClose,
		})
	);
}

(window as any).fetchAnnouncements = fetchAnnouncements;
