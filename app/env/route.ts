import { randomBytes, createHmac } from 'node:crypto';

const urls = {
	development: 'http://localhost:3000',
	preview: `https://${process.env.VERCEL_URL}`,
	production: 'https://corie.vercel.app',
};

const env = {
	url: urls[process.env.VERCEL_ENV as keyof typeof urls],
	environment: process.env.NODE_ENV,
};

const TOKEN_EXPIRATION = 5 * 60 * 1000;

interface Token {
	value: string;
	expires: number;
}

function generateToken(): Token {
	const value = randomBytes(32).toString('hex');
	const expires = Date.now() + TOKEN_EXPIRATION;
	return { value, expires };
}

export function GET() {
	const token = generateToken();
	const scriptToken = `${token.value}.${token.expires}.${createHmac('sha256', process.env.TOKEN_SECRET as string)
		.update(`${token.value}.${token.expires}`)
		.digest('hex')}`;

	return new Response(JSON.stringify({ ...env, token: scriptToken }));
}
