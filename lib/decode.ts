export function decode(encodedData: string, parse: boolean = true): string {
	const decoded = decodeURIComponent(atob(encodedData));
	return parse ? JSON.parse(decoded) : decoded;
}
