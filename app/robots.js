export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://artvision.pro/sitemap.xml', // ТВОЙ ДОМЕН
  }
}