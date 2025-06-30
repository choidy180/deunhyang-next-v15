import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'deunhyang.com',
                pathname: '/_images/**', // TMDB에서 사용하는 이미지 경로 패턴
            },
            {
                protocol: 'https',
                hostname: 'storage.keepgrow.com',
                pathname: '/admin/**',
            },
        ],
    },
};

export default nextConfig;
