import { solutions } from '@/data/solutions';
import { casesData } from '@/data/cases';
import { blogData } from '@/data/blog';

import { services } from '@/data/services';

export default function sitemap() {
  const baseUrl = 'https://art-vision.online';

  // Static routes
  const routes = [
    '',
    '/cases',
    '/blog',
    '/solutions',
    '/about',
    '/reviews',
    '/policy',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Solution routes
  const solutionRoutes = solutions.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic Case routes
  const caseRoutes = Object.keys(casesData).map((slug) => ({
    url: `${baseUrl}/cases/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic Blog routes
  const blogRoutes = Object.keys(blogData).map((slug) => ({
    url: `${baseUrl}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic Service routes
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...routes, ...solutionRoutes, ...caseRoutes, ...blogRoutes, ...serviceRoutes];
}