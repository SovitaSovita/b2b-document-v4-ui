/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{  ignoreDuringBuilds: true,},
    images: {
        domains: ['bizweb-doc.kosign.dev',
            'uxdt.nic.in',
            'platform.bizplay.co.kr',
            'lh3.googleusercontent.com',
            'cdn.create.microsoft.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bizweb-doc.kosign.dev',
                port: '',
                pathname: '/api/v1/files/view_images',
            },
        ],
        loader: 'default',
    },
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXT_URL: process.env.NEXT_URL,
        NEXT_API_URL: process.env.NEXT_API_URL,
        KEY: process.env.KEY,
        API_M_BASE_URL: process.env.API_M_BASE_URL
    },
};

export default nextConfig;
