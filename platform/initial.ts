import './ui/styles/styles.css';
import { Logger } from './logger.js';
import { ScriptLoader } from './shared.js';
import { fetchAnnouncements } from './announcements.js';
import { checkAndUpdateIdentifier, getUserIdentifier } from './identity';

async function initializeCorie(): Promise<void> {
	try {
		Logger.log('Initializing Corie script...');
		const scriptId = ScriptLoader.getScriptId();
		if (scriptId) {
			const domainMatched = await matchDomain(scriptId);
			if (domainMatched) {
				checkAndUpdateIdentifier();
				const userId = getUserIdentifier();
				Logger.log('User Identifier: ' + userId);

				injectStyles();
				await fetchAnnouncements(userId);
			} else {
				Logger.log('Domain not matched.');
			}
		} else {
			Logger.log('No script ID found.');
		}
	} catch (error) {
		console.error('Error initializing Corie:', error);
	}
}

async function matchDomain(scriptId: string): Promise<boolean> {
	const apiUrl = `/api/products/domain?scriptId=${scriptId}`;
	// const apiUrl = `https://corie-git-gt-codes-cor-10-create-a-script-that-a8dc35-gt-codes.vercel.app/api/products/domain?scriptId=${scriptId}`;
	try {
		const response = await fetch(apiUrl, {
			headers: {
				'X-Referer-Host': window.location.hostname,
				'X-Script-Secret': 'g5uUhoGtwaqG0m8y9wLjmhCPEnx5tOs1JS5CDgU+ifM=',
			},
		});
		if (!response.ok) {
			throw new Error('Unauthorized domain or other error');
		}
		const data = await response.json();
		return data.found;
	} catch (error) {
		Logger.log('Error matching domain: ' + error);
		return false;
	}
}

function injectStyles() {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = '/platform/ui/styles.css'; // Adjust this path if necessary
	document.head.appendChild(link);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeCorie);
} else {
	initializeCorie();
}
