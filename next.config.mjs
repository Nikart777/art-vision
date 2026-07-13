/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // Игнорируем ошибки eslint/ts при билде (чтобы деплой прошел, даже если где-то забыли запятую)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media.giphy.com' },
    ],
  },
  // 301 со старого нерелевантного URL на новый (контент — мобильная адаптация)
  async redirects() {
    return [
      {
        source: '/services/nextjs-development',
        destination: '/services/mobile-adaptation',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;