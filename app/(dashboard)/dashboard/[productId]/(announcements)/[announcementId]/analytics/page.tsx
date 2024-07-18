import { TINYBIRD_ANALYTICS_API_URL } from '@/platform/analytics/constants';
import ViewsChart from './ui/views-chart';
import { EngagementScore } from './ui/engagement-score';
import { CountriesPreview } from './ui/countries-preview';

type PossibleResponse = {
	data: {
		data_type: 'views_past_3_days' | 'engagement_score' | 'top_5_countries';
		avgEngagementScore: number | null;
		totalInteractions: number | null;
		country: string | null;
		count: number | null;
		time: string | null;
		views: number | null;
	}[];
};

export default async function AnalyticsPage({ params }: { params: { announcementId: string } }) {
	const response = await fetch(
		`${TINYBIRD_ANALYTICS_API_URL}/anl_visuals.json?announcementId=${params.announcementId}`,
		{
			headers: { Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}` },
		}
	);
	const { data } = (await response.json()) as PossibleResponse;

	const viewsPast3Days = data
		.filter((item) => item.data_type === 'views_past_3_days')
		.map((v) => ({ time: v.time, views: v.views }));

	const engagementScore = data.find((item) => item.data_type === 'engagement_score');

	const top5Countries = data
		.filter((item) => item.data_type === 'top_5_countries')
		.map((c) => ({ country: c.country, count: c.count }));

	return (
		<div className='mx-auto w-full p-6 grid grid-cols-2 gap-6'>
			<ViewsChart data={viewsPast3Days} />
			<EngagementScore data={engagementScore as { avgEngagementScore: number; totalInteractions: number }} />
			<CountriesPreview data={top5Countries} />
		</div>
	);
}
