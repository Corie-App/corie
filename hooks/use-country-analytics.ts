import { tinybirdFetcher } from '@/lib/fetch';
import useSWR from 'swr';

type CountryResponse = {
	country: string | null;
	count: number;
};

export function useCountryAnalytics(announcementId: string, runQuery = true) {
	const { data, error, isLoading } = useSWR(
		['anl_countries.json', { announcementId, runQuery }],
		([endpoint, args]) => tinybirdFetcher(endpoint, args)
	);

	return {
		isLoading,
		isError: error,
		data: data as CountryResponse[] | undefined,
	};
}
