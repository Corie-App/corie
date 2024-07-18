import { TINYBIRD_ANALYTICS_API_URL } from '@/platform/analytics/constants';
import ViewsChart from './ui/views-chart';
import { EngagementScore } from './ui/engagement-score';
import { CountriesPreview } from './ui/countries-preview';

type ViewsRes = { data: { time: string; views: number }[] };
type EngagementRes = { data: { avgEngagementScore: number; totalInteractions: number }[] };
type CountriesRes = { data: { country: string; count: number }[] };

const endpoints = ['anl_views', 'anl_engagement', 'anl_countries'];

export default async function AnalyticsPage({ params }: { params: { announcementId: string } }) {
	const [viewsRes, engagementRes, countriesRes] = (await Promise.all(
		endpoints.map((endpoint) =>
			fetch(`${TINYBIRD_ANALYTICS_API_URL}/${endpoint}.json?announcementId=${params.announcementId}`, {
				headers: { Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}` },
				cache: 'no-store',
			}).then((res) => res.json())
		)
	)) as [ViewsRes, EngagementRes, CountriesRes];

	return (
		<div className='mx-auto w-full p-6 grid grid-cols-2 gap-6'>
			<ViewsChart data={viewsRes.data} />
			<EngagementScore data={engagementRes.data[0]} />
			<CountriesPreview data={countriesRes.data} />
		</div>
	);
}
