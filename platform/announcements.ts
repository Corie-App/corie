import { Logger } from './logger.js';
import { ScriptLoader } from './shared.js';
import { Announcement } from './types.js';

export async function fetchAnnouncements(): Promise<void> {
	const scriptId = ScriptLoader.getScriptId();
	const apiUrl = `https://corie-git-gt-codes-cor-10-create-a-script-that-a8dc35-gt-codes.vercel.app/api/announcements?scriptId=${scriptId}`;
	try {
		const response = await fetch(apiUrl, {
			headers: {
				'X-Referer-Host': window.location.hostname,
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

function displayAnnouncements(data: { title: string; description: string }[]): void {
	const container = document.createElement('div');
	container.className = 'corie-announcement p-4 mb-4 bg-white rounded-lg shadow-lg';
	document.body.appendChild(container);

	data.slice(0, 1).forEach((announcement) => {
		const announcementElement = document.createElement('div');
		announcementElement.className = '';
		announcementElement.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${announcement.title}</h2>
        <p class="text-gray-700">${announcement.description}</p>
      `;
		container.appendChild(announcementElement);
	});
}

(window as any).fetchAnnouncements = fetchAnnouncements;
