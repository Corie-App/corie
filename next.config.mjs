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
};

export default nextConfig;
