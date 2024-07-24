import { Logger } from './logger';

export class ScriptLoader {
	private static scripts = new Map<string, Promise<HTMLScriptElement>>();

	static async loadScript(url: string): Promise<HTMLScriptElement> {
		Logger.log(`Loading script ${url}`);
		if (!this.scripts.has(url)) {
			const scriptPromise = new Promise<HTMLScriptElement>((resolve, reject) => {
				const script = document.createElement('script');
				script.src = url;
				script.type = 'module';
				script.defer = true;
				script.onload = () => resolve(script);
				script.onerror = reject;
				document.head.appendChild(script);
			});
			this.scripts.set(url, scriptPromise);
		}
		return this.scripts.get(url)!;
	}

	static getScriptId(): string | null {
		const scriptTag = document.querySelector('script[src*="initial.js"]') as HTMLScriptElement | null;
		if (!scriptTag) {
			console.error('Script tag not found');
			return null;
		}
		const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
		return urlParams.get('s');
	}
}
