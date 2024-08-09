export function decode<T = string>(encodedData: string, parse: boolean = true): T {
	const decoded = decodeURIComponent(atob(encodedData));
	return parse ? (JSON.parse(decoded) as T) : (decoded as T);
}
