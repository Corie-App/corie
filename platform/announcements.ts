import { Logger } from './logger.js';
import { ScriptLoader } from './shared.js';
import { Announcement, ButtonStyle } from './types.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AnnouncementWrapper from './ui/components/announcement-wrapper.jsx';

export async function fetchAnnouncements(): Promise<void> {
	displayAnnouncements([]);
	return;
	// const scriptId = ScriptLoader.getScriptId();
	// const apiUrl = `/api/announcements?scriptId=${scriptId}`;
	// // const apiUrl = `https://corie-git-gt-codes-cor-10-create-a-script-that-a8dc35-gt-codes.vercel.app/api/announcements?scriptId=${scriptId}`;
	// try {
	// 	const response = await fetch(apiUrl, {
	// 		headers: {
	// 			'X-Referer-Host': window.location.hostname,
	// 			'X-Script-Secret': 'g5uUhoGtwaqG0m8y9wLjmhCPEnx5tOs1JS5CDgU+ifM=',
	// 		},
	// 	});
	// 	if (!response.ok) {
	// 		throw new Error('Error fetching announcements');
	// 	}
	// 	const data = (await response.json()) as Announcement[];
	// 	displayAnnouncements(data);
	// } catch (error) {
	// 	Logger.log('Error fetching announcements: ' + error);
	// }
}

function displayAnnouncements(
	data: { title: string; description: string; primaryColor: string; buttonStyle: ButtonStyle }[]
): void {
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
			layout: 'image-top' as 'default' | 'image-left' | 'image-top',
			description:
				// 'wwwwwwwwwwwwwwwwww wwwwwwwwwww wwwwwwwwwwwwwwwwww wwwwwwwwwww wwwwwwwwwwwwwwwwww wwwwwwwwwww',
				'You can now choose the infrastructure you want to use for your script. We have added a new pricing model that is more flexible and affordable.',
			primaryColor: '#007AFF',
			buttonStyle: 'flat' as ButtonStyle,
		},
	];

	console.log({ _data });
	root.render(
		React.createElement(AnnouncementWrapper, {
			title: _data[0].title,
			description: _data[0].description,
			onClose: handleClose,
			layout: _data[0].layout,
			primaryColor: _data[0].primaryColor,
			buttonStyle: _data[0].buttonStyle,
			// image: _data[0].image,
			// theme: _data[0].theme,
			// layout: _data[0].layout,
		})
	);
}

(window as any).fetchAnnouncements = fetchAnnouncements;
