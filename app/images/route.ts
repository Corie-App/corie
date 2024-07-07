import { type NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const url = searchParams.get('url');

	if (!url) {
		return new Response('Missing URL parameter', { status: 400 });
	}

	try {
		const imageResponse = await fetch(url, {
			headers: {
				'User-Agent': 'Corie/1.0',
			},
		});

		if (!imageResponse.ok) {
			return new Response('Failed to fetch image', { status: imageResponse.status });
		}

		const contentType = imageResponse.headers.get('Content-Type');
		const imageBuffer = await imageResponse.arrayBuffer();

		return new Response(imageBuffer, {
			headers: {
				'Content-Type': contentType || 'image/*',
				'Cache-Control': 'public, max-age=3600',
			},
		});
	} catch (error) {
		console.error('Error fetching image:', error);
		return new Response('Error fetching image', { status: 500 });
	}
}
