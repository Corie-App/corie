import { Logger } from './logger.js';
import { ScriptLoader } from './shared.js';

async function initializeCorie(): Promise<void> {
	try {
		Logger.log('Initializing Corie script...');
		addCustomStyles();
		const scriptId = ScriptLoader.getScriptId();
		if (scriptId) {
			const domainMatched = await matchDomain(scriptId);
			if (domainMatched) {
				await ScriptLoader.loadScript(
					'https://corie-git-gt-codes-cor-10-create-a-script-that-a8dc35-gt-codes.vercel.app/platform/announcements.js'
				);
				if (typeof (window as any).fetchAnnouncements === 'function') {
					await (window as any).fetchAnnouncements();
				} else {
					Logger.log('fetchAnnouncements function not found');
				}
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
	const apiUrl = `https://corie-git-gt-codes-cor-10-create-a-script-that-a8dc35-gt-codes.vercel.app/api/products/domain?scriptId=${scriptId}`;
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

function addCustomStyles(): void {
	const style = document.createElement('style');
	style.innerHTML = `
      .corie-announcement {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        max-width: 600px;
        margin: 20px auto;
		position: absolute;
		right: 24px;
		bottom: 24px;
		z-index: 1000;
      }
      .corie-announcement h2 {
        color: #333;
      }
      .corie-announcement p {
        color: #666;
      }
    `;
	document.head.appendChild(style);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeCorie);
} else {
	initializeCorie();
}
