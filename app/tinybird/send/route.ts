import { decode } from '@/lib/decode';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
	const encodedPayload = await request.text();

	if (!encodedPayload) {
		return NextResponse.json({ error: 'Encoded payload is required' }, { status: 400 });
	}

	try {
		const decodedPayload = decode(encodedPayload);

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

		return NextResponse.json({ success: true, ...data });
	} catch (error) {
		console.error('Error processing request:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
