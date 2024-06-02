const withNextIntl = require('next-intl/plugin')();
//  https://nextjs.org/docs/app/api-reference/edge#environment-variables
module.exports = withNextIntl({
	
	images: {
		remotePatterns: [
			{
				hostname: 'localhost',
				pathname: '/api/**',
			},
			{
				hostname: 'penpink',
				pathname: '/api/**',
			},
		],
	},

	headers: () => {
		return [
			{
				// matching all API routes
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
					{ key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Authorization, Content-Type, Date, X-Api-Version',
					},
				],
			},
		];
	},
	output: 'standalone',
});