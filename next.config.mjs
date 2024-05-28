/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['platform.bizplay.co.kr', 'lh3.googleusercontent.com'],
    },
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        KEY: process.env.KEY,
        NEXT_APIURLFILE: process.env.NEXT_APIURLFILE,
        API_BASE_URL: process.env.API_BASE_URL
    },
};

export default nextConfig;
