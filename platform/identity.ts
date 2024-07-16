import { generateUUID } from './utils';

const COOKIE_NAME = 'corie_uid';
const STORAGE_KEY = 'corie_uid';

export function getUserIdentifier(): string {
	let identifier = getCookie(COOKIE_NAME) || localStorage.getItem(STORAGE_KEY);

	if (!identifier) {
		identifier = generateUUID();
		setCookie(COOKIE_NAME, identifier, 365); // Set cookie for 1 year
		localStorage.setItem(STORAGE_KEY, identifier);
	}

	return identifier;
}

function getCookie(name: string): string | null {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number): void {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = 'expires=' + date.toUTCString();
	document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// Simple fingerprinting function
function getSimpleFingerprint(): string {
	const screen = window.screen;
	const nav = window.navigator;
	return [nav.userAgent, screen.height, screen.width, screen.colorDepth, new Date().getTimezoneOffset()].join('|');
}

export function checkAndUpdateIdentifier(): void {
	const currentFingerprint = getSimpleFingerprint();
	const storedFingerprint = localStorage.getItem('corie_fingerprint');

	if (storedFingerprint && storedFingerprint !== currentFingerprint) {
		// Fingerprint changed, generate new identifier
		const newIdentifier = generateUUID();
		setCookie(COOKIE_NAME, newIdentifier, 365);
		localStorage.setItem(STORAGE_KEY, newIdentifier);
		localStorage.setItem('corie_fingerprint', currentFingerprint);
	} else if (!storedFingerprint) {
		localStorage.setItem('corie_fingerprint', currentFingerprint);
	}
}
