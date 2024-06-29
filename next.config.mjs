/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects() {
		return [
			{
				source: '/',
				destination: '/dashboard',
				permanent: false,
				has: [
					{
						type: 'cookie',
						key: '__session',
					},
				],
			},
		];
	},
	rewrites() {
		return [
			{
				source: '/home',
				destination: '/',
			},
		];
	},
	async headers() {
		return [
			{
				source: '/api/(.*)',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Script-Secret, X-Referer-Host',
					},
				],
			},
		];
	},
};

export default nextConfig;
