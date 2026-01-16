export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/', '/_next/'],
    },
    sitemap: 'https://art-vision.online/sitemap.xml',
    host: 'https://art-vision.online'
  }
}