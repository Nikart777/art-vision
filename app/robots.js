export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/*?*'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        cleanParam: 'utm_source&utm_medium&utm_campaign&utm_content&utm_term&ref',
      }
    ],
    // ВАЖНО: Правильный домен
    sitemap: 'https://art-vision.online/sitemap.xml', 
    host: 'https://art-vision.online'
  }
}