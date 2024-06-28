import { headers } from 'next/headers';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const scriptId = searchParams.get('s');

	if (!scriptId) return new Response('Incorrect value provided to Corie');
	const headersList = headers();
	const referer = headersList.get('referer');
	// const [data, err] = await matchDomain({ number: 24 });
	console.log({ referer, headersList });
	return new Response(`Hello World from ${referer} `, {
		headers: {
			'Content-Type': 'text/plain',
		},
	});
}
