import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyToken(token: string): boolean {
	const [value, expiresStr] = token.split('.');
	const expires = parseInt(expiresStr, 10);

	if (isNaN(expires) || Date.now() > expires) {
		return false;
	}

	const expectedHash = createHmac('sha256', process.env.TOKEN_SECRET as string)
		.update(`${value}.${expires}`)
		.digest('hex');

	return timingSafeEqual(Buffer.from(token), Buffer.from(`${value}.${expires}.${expectedHash}`));
}
