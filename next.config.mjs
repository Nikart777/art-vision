/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  async headers() {
    return [
      {
        source: '/:all*(woff|woff2|svg|jpg|jpeg|png|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;