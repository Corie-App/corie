import { headers } from 'next/headers';
import { type NextRequest } from 'next/server';
import { matchDomain, getAnnouncements } from '../api/actions';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const scriptId = searchParams.get('s');

	if (!scriptId) return new Response('Incorrect value provided to Corie');
	const headersList = headers();
	const hostname = headersList.get('referer');
	if (!hostname) return new Response("Can't indentify the referer");

	const [data, err] = await matchDomain({ scriptId, hostname });
	if (!data?.found) return new Response('Domain not matched');
	else {
		const [announcements, err] = await getAnnouncements({ scriptId });
		if (err) return new Response('Error fetching announcements');
		return new Response(JSON.stringify(announcements), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
