import { solutions } from '@/data/solutions';
import { casesData } from '@/data/cases';
import { blogData } from '@/data/blog';
import { services } from '@/data/services';

const baseUrl = 'https://art-vision.online';

// Приоритеты отражают маржинальность разделов (goal.md §1):
// коммерческие услуги и отраслевые решения — выше, инфо-контент — ниже.
// Так робот тратит краулинговый бюджет сначала на страницы, которые приносят лиды.
const PRIORITY = {
    home: 1.0,
    servicesHub: 0.9,
    service: 0.9,
    solutionsHub: 0.8,
    solution: 0.8,
    casesHub: 0.6,
    case: 0.6,
    blogHub: 0.5,
    post: 0.5,
    trust: 0.5,   // about / reviews / faq — прогрев, не деньги
    legal: 0.3,   // policy — нужен юридически, вес ему не нужен
};

export default function sitemap() {
    const now = new Date();

    const staticRoutes = [
        { path: '', priority: PRIORITY.home, changeFrequency: 'weekly' },
        // Хаб услуг раньше отсутствовал в карте сайта — главная точка входа в деньги
        { path: '/services', priority: PRIORITY.servicesHub, changeFrequency: 'weekly' },
        { path: '/solutions', priority: PRIORITY.solutionsHub, changeFrequency: 'weekly' },
        { path: '/cases', priority: PRIORITY.casesHub, changeFrequency: 'monthly' },
        { path: '/blog', priority: PRIORITY.blogHub, changeFrequency: 'weekly' },
        { path: '/about', priority: PRIORITY.trust, changeFrequency: 'monthly' },
        { path: '/reviews', priority: PRIORITY.trust, changeFrequency: 'monthly' },
        // FAQ индексировался, но в карте сайта его не было
        { path: '/faq', priority: PRIORITY.trust, changeFrequency: 'monthly' },
        { path: '/policy', priority: PRIORITY.legal, changeFrequency: 'yearly' },
    ].map(({ path, priority, changeFrequency }) => ({
        url: `${baseUrl}${path}/`,
        lastModified: now,
        changeFrequency,
        priority,
    }));

    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: PRIORITY.service,
    }));

    const solutionRoutes = solutions.map((solution) => ({
        url: `${baseUrl}/solutions/${solution.slug}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: PRIORITY.solution,
    }));

    const caseRoutes = Object.keys(casesData).map((slug) => ({
        url: `${baseUrl}/cases/${slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: PRIORITY.case,
    }));

    const blogRoutes = Object.entries(blogData).map(([slug, post]) => ({
        url: `${baseUrl}/blog/${slug}/`,
        // У статьи есть собственная дата — она честнее, чем дата сборки
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: 'monthly',
        priority: PRIORITY.post,
    }));

    return [
        ...staticRoutes,
        ...serviceRoutes,
        ...solutionRoutes,
        ...caseRoutes,
        ...blogRoutes,
    ];
}
