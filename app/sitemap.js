export default function sitemap() {
  return [
    {
      url: 'https://art-vision.online', // <--- ВАЖНО
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // ...
  ]
}