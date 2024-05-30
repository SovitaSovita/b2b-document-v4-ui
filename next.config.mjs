/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['platform.bizplay.co.kr', 'lh3.googleusercontent.com', 'cdn.create.microsoft.com'],
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
