import { Logger } from './logger';
import { ScriptLoader } from './shared';

(async function () {
	async function initializeCorie(): Promise<void> {
		Logger.log('Initializing Corie script...');
		addCustomStyles();
		const scriptId = getScriptId();
		if (scriptId) {
			const domainMatched = await matchDomain(scriptId);
			if (domainMatched) {
				await ScriptLoader.loadScript('/platform/announcements.js');
			} else {
				Logger.log('Domain not matched.');
			}
		} else {
			Logger.log('No script ID found.');
		}
	}

	function getScriptId(): string | null {
		const scriptTag = document.currentScript as HTMLScriptElement;
		const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
		return urlParams.get('s');
	}

	async function matchDomain(scriptId: string): Promise<boolean> {
		const apiUrl = `/api/products/domain?scriptId=${scriptId}`;
		try {
			const response = await fetch(apiUrl, {
				headers: {
					'X-Referer-Host': window.location.hostname,
					'X-Script-Secret': 'your-secret-key',
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
		style.type = 'text/css';
		style.innerHTML = `
      .corie-announcements {
        padding: 10px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        max-width: 600px;
        margin: 20px auto;
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
})();
