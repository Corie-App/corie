import { Logger } from './logger.js';
import { ScriptLoader } from './shared.js';
import { Announcement } from './types.js';

export async function fetchAnnouncements(): Promise<void> {
	displayAnnouncements([]);
	return;
	const scriptId = ScriptLoader.getScriptId();
	const apiUrl = `/api/announcements?scriptId=${scriptId}`;
	// const apiUrl = `https://corie-git-gt-codes-cor-10-create-a-script-that-a8dc35-gt-codes.vercel.app/api/announcements?scriptId=${scriptId}`;
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
	container.id = 'corie-announcements';
	container.className =
		'corie-announcement max-w-sm p-4 bg-white ring-1 ring-inset ring-gray-200 rounded-xl corie-animate-fade-in-up';
	container.style.opacity = '0';
	container.style.transform = 'translateY(10px)';

	document.body.appendChild(container);

	setTimeout(() => {
		container.offsetHeight;
		container.style.opacity = '';
		container.style.transform = '';
	}, 0);

	// data.slice(0, 1).forEach((announcement) => {
	[
		{
			title: 'Improved infrastructure pricing',
			description:
				'You can now choose the infrastructure you want to use for your script. We have added a new pricing model that is more flexible and affordable.',
		},
	].forEach((announcement) => {
		const announcementElement = document.createElement('div');
		announcementElement.className = 'space-y-4';
		announcementElement.innerHTML = `
		<div class="space-y-2">
			<h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Upgrade to Pro</h3>
			<div class="mt-4">
				<p class="text-sm text-muted-foreground">
				It looks like you're currently on our Free plan. Please consider upgrading to Pro to enjoy higher limits and
				extra features.
				</p>
			</div>
		</div>
		<div class="flex items-center justify-between gap-3">
			<button
				type="button"
				class="w-full h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
			>
				Don't show again
			</button>
			<button
				type="button"
				class="w-full h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90"
			>
				Upgrade to Pro
			</button>
		</div>
	  `;
		container.appendChild(announcementElement);
	});
}

(window as any).fetchAnnouncements = fetchAnnouncements;
