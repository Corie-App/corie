import { Logger } from './logger.js';
import { ScriptLoader } from './shared.js';

async function initializeCorie(): Promise<void> {
	try {
		addCustomStyles();
		loadTailwindCSS();
		addAnimationStyles();

		Logger.log('Initializing Corie script...');
		const scriptId = ScriptLoader.getScriptId();
		if (scriptId) {
			const domainMatched = await matchDomain(scriptId);
			if (domainMatched) {
				await ScriptLoader.loadScript(
					'/platform/announcements.js'
					// 'https://corie-git-gt-codes-cor-10-create-a-script-that-a8dc35-gt-codes.vercel.app/platform/announcements.js'
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

function addCustomStyles(): void {
	const style = document.createElement('style');
	style.innerHTML = `
      .corie-announcement {
        max-width: 24rem;
		position: absolute;
		right: 16px;
		bottom: 16px;
		z-index: 1000;
      }
    `;
	document.head.appendChild(style);
}

function loadTailwindCSS() {
	const link = document.createElement('link');
	link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
	link.rel = 'stylesheet';
	document.head.appendChild(link);
}

function addAnimationStyles() {
	const style = document.createElement('style');
	style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(24px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .corie-animate-fade-in-up {
            animation: fadeInUp 0.25s ease-out forwards;
        }
    `;
	document.head.appendChild(style);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeCorie);
} else {
	initializeCorie();
}
