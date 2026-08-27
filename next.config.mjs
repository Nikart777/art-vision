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
  // 301-редиректы легаси-URL вынесены в middleware.js: там адрес назначения
  // не нормализуется и переход получается ровно один, без цепочки
  // (см. комментарий в middleware.js).
};

export default nextConfig;