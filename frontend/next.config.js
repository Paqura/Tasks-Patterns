/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/uploads/:path*`,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.pts-global-admin.csssr.cloud',
            },
            {
                protocol: 'https',
                hostname: 'pts-global-admin-testing.s3.eu-west-2.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'storage.yandexcloud.net',
            },
            {
                protocol: 'https',
                hostname: 'pts-global-admin-production.csssr.cloud',
            },
            {
                protocol: 'https',
                hostname: 'pts-global-frontend-production.csssr.cloud',
            },
            {
                protocol: 'https',
                hostname: 'global.ptsecurity.com',
            },
            {
                protocol: 'https',
                hostname: '*.global.ptsecurity.com',
            },
        ],
    },
}

module.exports = nextConfig
