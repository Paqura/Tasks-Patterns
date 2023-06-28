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
                hostname: 'pts-global-admin.storage.yandexcloud.net',
            },
        ],
    },
}

module.exports = nextConfig
