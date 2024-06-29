import { headers } from 'next/headers';
import { type NextRequest } from 'next/server';
import { matchDomain, getAnnouncements } from '../api/actions';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const scriptId = searchParams.get('s');

	if (!scriptId) return new Response('Incorrect value provided to Corie');
	const referer = headers().get('referer');
	if (!referer) return new Response("Can't indentify the referer");
	const hostname = new URL(referer).hostname;

	const [data, err] = await matchDomain({ scriptId, hostname });
	if (!data?.found) return new Response('Domain not matched');
	else {
		const [announcements, err] = await getAnnouncements({ scriptId });
		if (err) {
			console.log({ err });
			return new Response('Error fetching announcements');
		}
		return new Response(JSON.stringify(announcements), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
