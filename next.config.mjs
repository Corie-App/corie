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
			{
				source: '/dashboard/:productId/settings',
				destination: '/dashboard/:productId/settings',
			},
			{
				source: '/dashboard/:productId/:announcementId',
				destination: '/dashboard/:productId/:announcementId/customize',
			},
		];
	},
};

export default nextConfig;
