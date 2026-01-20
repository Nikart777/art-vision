export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/_next/static/'],
      disallow: ['/api/', '/admin/', '/private/'],
    },
    sitemap: 'https://art-vision.online/sitemap.xml',
    host: 'https://art-vision.online'
  }
}