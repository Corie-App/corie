import { Logger } from './logger.js';
import { ScriptLoader } from './shared.js';
import { Announcement, ButtonStyle } from './types.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AnnouncementWrapper from './ui/components/announcement-wrapper.jsx';

export async function fetchAnnouncements(): Promise<void> {
	// displayAnnouncements([]);
	// return;
	const scriptId = ScriptLoader.getScriptId();
	const apiUrl = `/api/announcements?scriptId=${scriptId}`;
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
		displayAnnouncements(data);
	} catch (error) {
		Logger.log('Error fetching announcements: ' + error);
	}
}

function displayAnnouncements(data: Announcement[]): void {
	const container = document.createElement('div');
	container.className = 'corie-root ';
	document.body.appendChild(container);

	const root = createRoot(container);

	const handleClose = () => {
		root.unmount();
		container.remove();
	};

	const _data = [
		{
			title: 'Improved pricing to our infrastructure',
			layout: 'image-left' as 'default' | 'image-left' | 'image-top',
			description:
				// 'wwwwwwwwwwwwwwwwww wwwwwwwwwww wwwwwwwwwwwwwwwwww wwwwwwwwwww wwwwwwwwwwwwwwwwww wwwwwwwwwww',
				'You can now choose the infrastructure you want to use for your script. We have added a new pricing model that is more flexible and affordable.',
			primaryColor: '#007AFF',
			imageUrl: 'https://pbs.twimg.com/profile_images/1625874623303647233/D8B8H8Xq_400x400.jpg',
			buttonStyle: 'flat' as ButtonStyle,
		},
	];

	root.render(
		React.createElement(AnnouncementWrapper, {
			title: data[0].title,
			description: data[0].description,
			onClose: handleClose,
			layout: data[0].layout,
			imageUrl: data[0].imageUrl,
			primaryColor: data[0].primaryColor,
			buttonStyle: data[0].buttonStyle,
			// image: _data[0].image,
			// theme: _data[0].theme,
			// layout: _data[0].layout,
		})
	);
}

(window as any).fetchAnnouncements = fetchAnnouncements;
