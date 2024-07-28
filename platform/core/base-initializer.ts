import { CorieAnalytics } from '../analytics';
import { Env } from '../utils/types';

export abstract class BaseInitializer {
	protected analytics: CorieAnalytics | null = null;
	protected env: Env | null = null;
	protected scriptId: string;

	constructor(scriptId: string) {
		this.scriptId = scriptId;
		this.initialize();
	}

	protected abstract initialize(): Promise<void>;

	protected async fetchEnv(): Promise<void> {
		try {
			const baseUrl = 'https://www.corie.io';
			// const baseUrl = 'https://corie-git-gt-codes-cor-23-get-demo-usage-working-gt-codes.vercel.app';
			// const baseUrl = 'http://localhost:3000';

			const callbackName = `corie_env_${Date.now()}`;

			return new Promise((resolve, reject) => {
				(window as any)[callbackName] = (data: Env) => {
					this.env = data;
					delete (window as any)[callbackName];
					resolve();
				};

				const script = document.createElement('script');
				script.src = `${baseUrl}/env?callback=${callbackName}&scriptId=${this.scriptId}`;
				script.onerror = () => reject(new Error('Failed to load environment data'));
				script.onload = () => {
					if (!this.env) {
						reject(new Error('Environment data not received'));
					}
				};
				document.head.appendChild(script);

				// Set a timeout in case the server doesn't respond
				setTimeout(() => {
					if ((window as any)[callbackName]) {
						delete (window as any)[callbackName];
						reject(new Error('Timeout while fetching environment data'));
					}
				}, 5000); // 5 second timeout
			});
		} catch (error) {
			console.error('Error fetching environment variables:', error);
			throw error; // Re-throw the error to be handled by the caller
		}
	}

	protected async matchDomain(): Promise<{ found: boolean; country: string | null }> {
		if (!this.env) {
			throw new Error('Environment not available');
		}

		const callbackName = `corie_domain_${Date.now()}`;

		return new Promise((resolve, reject) => {
			(window as any)[callbackName] = (data: { found: boolean; country: string | null; error?: string }) => {
				delete (window as any)[callbackName];
				if (data.error) {
					reject(new Error(data.error));
				} else {
					resolve(data);
				}
			};

			const script = document.createElement('script');
			script.src = `${this.env?.url}/api/products/domain?callback=${callbackName}&scriptId=${
				this.scriptId
			}&host=${encodeURIComponent(window.location.hostname)}`;
			script.onerror = () => reject(new Error('Failed to load domain matching data'));
			script.onload = () => {
				setTimeout(() => {
					if ((window as any)[callbackName]) {
						delete (window as any)[callbackName];
						reject(new Error('Timeout while matching domain'));
					}
				}, 5000); // 5 second timeout
			};
			document.head.appendChild(script);
		});
	}

	protected injectStyles(): void {
		if (this.env) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = `${this.env.url}/platform/ui/styles.css`;
			document.head.appendChild(link);
		}
	}
}
