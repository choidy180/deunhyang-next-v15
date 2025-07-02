import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 🔧 React 개발 엄격 모드 비활성화 (useEffect 등 2번 실행 방지)
    reactStrictMode: false,

    // 🖼️ 외부 이미지 도메인 허용 설정
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'deunhyang.com',
                pathname: '/_images/**', // Deunhyang 이미지 경로
            },
            {
                protocol: 'https',
                hostname: 'deunhyang.com',
                pathname: '/web/product/medium/**', // Deunhyang 이미지 경로
            },
            {
                protocol: 'https',
                hostname: 'storage.keepgrow.com',
                pathname: '/admin/**', // Keepgrow 이미지 경로
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/a/**', // Google 유저 프로필 이미지 등
            }
        ],
    },

    compiler: {
        styledComponents: true,
    },
};

export default nextConfig;
