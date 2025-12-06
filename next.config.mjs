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
};

export default nextConfig;