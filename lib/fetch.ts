export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export const tinybirdFetcher = async (url: string, args: Record<string, string | boolean>) => {
	if (args.runQuery === false) return;

	delete args.runQuery;
	const endpoint = url.startsWith('/') ? url.slice(1) : url;

	const queryParams = new URLSearchParams({
		endpoint,
		...args,
	});

	const response = await fetch(`/tinybird?${queryParams}`);

	if (!response.ok) {
		throw new Error('API request failed');
	}

	return response.json();
};
