import { decode } from '@/lib/decode';
import { scriptProcedure } from '@/lib/procedures';
import { AnalyticsEvent } from '@/platform/analytics';
import { kv } from '@vercel/kv';
import { z } from 'zod';

const TrackEventSchema = z.object({
	callback: z.string().optional(),
	data: z.string(),
});

export const trackEvent = scriptProcedure
	.createServerAction()
	.input(TrackEventSchema)
	.handler(async ({ input }) => {
		const decodedPayload = decode<AnalyticsEvent>(input.data);

		const response = await fetch(`https://api.us-east.aws.tinybird.co/v0/events?name=corie_analytics_events`, {
			method: 'POST',
			body: JSON.stringify(decodedPayload),
			headers: {
				Authorization: `Bearer ${process.env.TINYBIRD_INGEST_KEY}`,
			},
		});

		if (!response.ok) {
			console.log({ response });
			throw new Error('Tinybird API request failed');
		}
		const data = await response.json();

		if (decodedPayload.type === 'dismiss' || decodedPayload.type === 'cta_click') {
			await kv.sadd(`user:${decodedPayload.userId}:dismissals`, decodedPayload.announcementId);
		}

		if (input.callback) {
			return new Response(`${input.callback}(${JSON.stringify(data)})`, {
				headers: {
					'Content-Type': 'application/javascript',
				},
			});
		} else return data;
	});
