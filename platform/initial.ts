import './ui/styles/styles.css';
import { CorieInitializer } from './core/corie-initializer';

declare global {
	interface Window {
		Corie: {
			init: (scriptId: string) => void;
		};
	}
}

function getScriptId(): string | null {
	const scriptTag = document.querySelector('script[src*="initial.js"]') as HTMLScriptElement | null;
	if (!scriptTag) {
		console.error('Corie: Script tag not found');
		return null;
	}
	const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
	return urlParams.get('s');
}

function initCorie() {
	const scriptId = getScriptId();
	if (scriptId) {
		new CorieInitializer(scriptId);
	} else {
		console.error('Corie: No script ID found in the script tag.');
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initCorie);
} else {
	initCorie();
}
