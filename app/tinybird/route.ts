import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const endpoint = searchParams.get('endpoint');

	if (!endpoint) {
		return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
	}

	// Remove the 'endpoint' from searchParams
	searchParams.delete('endpoint');

	const tinybirdUrl = `https://api.us-east.aws.tinybird.co/v0/pipes/${endpoint}?${searchParams}`;

	try {
		const response = await fetch(tinybirdUrl, {
			headers: {
				Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
			},
		});

		if (!response.ok) {
			throw new Error('Tinybird API request failed');
		}

		const { data } = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching from Tinybird:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
