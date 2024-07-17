import { TINYBIRD_ANALYTICS_API_URL } from '@/platform/analytics/constants';
import ViewsChart from './ui/views-chart';
import { EngagementScore } from './ui/engagement-score';

const fetcher = (url: string) =>
	fetch(url, { headers: { Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}` } }).then((res) => res.json());

type ViewsRes = { data: { time: string; views: number }[] };
type EngagementRes = { data: { avgEngagementScore: number; totalInteractions: number }[] };

export default async function AnalyticsPage({ params }: { params: { announcementId: string } }) {
	const [viewsRes, engagementRes] = (await Promise.all([
		fetcher(`${TINYBIRD_ANALYTICS_API_URL}/anl_views.json?announcement_id=${params.announcementId}`),
		fetcher(`${TINYBIRD_ANALYTICS_API_URL}/anl_engagement.json?announcement_id=${params.announcementId}`),
	])) as [ViewsRes, EngagementRes];

	return (
		<div className='h-full mx-auto w-full p-6 grid grid-cols-2 gap-6'>
			<ViewsChart data={viewsRes.data} />
			<EngagementScore
				totalInteractions={engagementRes.data[0].totalInteractions}
				avgEngagementScore={engagementRes.data[0].avgEngagementScore}
			/>
		</div>
	);
}
