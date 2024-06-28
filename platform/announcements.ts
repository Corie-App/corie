import { Logger } from './logger';

export async function fetchAnnouncements(): Promise<void> {
	const scriptId = getScriptId();
	const apiUrl = `/api/announcements?scriptId=${scriptId}`;
	try {
		const response = await fetch(apiUrl, {
			headers: {
				'X-Referer-Host': window.location.hostname,
				'X-Script-Secret': 'your-secret-key',
			},
		});
		if (!response.ok) {
			throw new Error('Error fetching announcements');
		}
		const data = await response.json();
		displayAnnouncements(data.announcements);
	} catch (error) {
		Logger.log('Error fetching announcements: ' + error);
	}
}

function getScriptId(): string | null {
	const scriptTag = document.querySelector('script[src*="initial.js"]') as HTMLScriptElement;
	const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
	return urlParams.get('s');
}

function displayAnnouncements(data: { title: string; description: string }[]): void {
	const container = document.createElement('div');
	container.className = 'corie-announcements';
	document.body.appendChild(container);

	data.forEach((announcement) => {
		const announcementElement = document.createElement('div');
		announcementElement.className = 'corie-announcement p-4 mb-4 bg-white rounded-lg shadow-lg';
		announcementElement.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${announcement.title}</h2>
        <p class="text-gray-700">${announcement.description}</p>
      `;
		container.appendChild(announcementElement);
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', fetchAnnouncements);
} else {
	fetchAnnouncements();
}

