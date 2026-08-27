#!/usr/bin/env node
/**
 * SEO-линтер по собранному билду.
 *
 * Проверяет то, что задано регламентом (goal.md §4–§6) и что легко ломается
 * при обычной правке контента: длину title/description, единственность H1,
 * отличие H1 от title, canonical, alt у картинок, nofollow у внешних ссылок.
 *
 *   npm run build && npm run seo:check
 *
 * Код возврата 1 при наличии ошибок — удобно повесить в CI.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const BUILD_DIR = join(process.cwd(), '.next', 'server', 'app');
const SITE_HOST = 'art-vision.online';

// Границы из регламента: title до 70 символов, description 148–160.
const LIMITS = {
    titleMax: 70,
    descriptionMin: 148,
    descriptionMax: 160,
};

// Страницы, которым по смыслу не нужен продающий description нужной длины.
const RELAXED = new Set(['/policy', '/_not-found']);

// 404 отдаётся со статусом 404 и в индекс не попадает,
// поэтому canonical на нём не требуется.
const NO_CANONICAL_NEEDED = new Set(['/_not-found']);

function walk(dir) {
    const out = [];
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) out.push(...walk(full));
        else if (entry.endsWith('.html')) out.push(full);
    }
    return out;
}

function decode(value = '') {
    return value
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ');
}

function stripTags(html = '') {
    return decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

function metaContent(html, attr, value) {
    const re = new RegExp(`<meta[^>]*${attr}="${value}"[^>]*>`, 'i');
    const tag = html.match(re)?.[0];
    if (!tag) return null;
    return decode(tag.match(/content="([^"]*)"/i)?.[1] ?? '');
}

function analyse(file) {
    const html = readFileSync(file, 'utf8');
    const route =
        '/' +
        relative(BUILD_DIR, file)
            .split(sep)
            .join('/')
            .replace(/\.html$/, '')
            .replace(/^index$/, '');

    const title = decode(html.match(/<title>(.*?)<\/title>/is)?.[1] ?? '');
    const description = metaContent(html, 'name', 'description');
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1] ?? null;

    const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)];
    const h1Texts = h1Matches.map((m) => stripTags(m[1]));

    // alt="" — валидная разметка для декоративных картинок (счётчики, фоны),
    // поэтому ругаемся только на полное отсутствие атрибута.
    const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    const imgsWithoutAlt = imgs.filter((tag) => !/\balt=/.test(tag));

    const externalLinks = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi)]
        .filter(([, href]) => !href.includes(SITE_HOST))
        .map(([tag, href]) => ({ tag, href }));
    const externalWithoutNofollow = externalLinks.filter(({ tag }) => !/rel="[^"]*nofollow/i.test(tag));

    const jsonLdTypes = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis)]
        .flatMap(([, raw]) => {
            try {
                const parsed = JSON.parse(decode(raw));
                return [].concat(parsed).map((node) => node['@type']).filter(Boolean);
            } catch {
                return ['<invalid JSON-LD>'];
            }
        });

    return {
        route,
        title,
        description,
        canonical,
        h1Texts,
        imgCount: imgs.length,
        imgsWithoutAlt: imgsWithoutAlt.length,
        externalWithoutNofollow: externalWithoutNofollow.map((l) => l.href),
        jsonLdTypes,
    };
}

function check(page, seenTitles) {
    const errors = [];
    const warnings = [];
    const relaxed = RELAXED.has(page.route);

    if (!page.title) {
        errors.push('нет <title>');
    } else {
        if (page.title.length > LIMITS.titleMax) {
            errors.push(`title ${page.title.length} симв. (макс ${LIMITS.titleMax})`);
        }
        const dup = seenTitles.get(page.title);
        if (dup) errors.push(`title дублирует ${dup}`);
        else seenTitles.set(page.title, page.route);
        // Классическая опечатка: бренд из шаблона + бренд, вписанный руками
        if ((page.title.match(/Art\.Vision/g) || []).length > 1) {
            errors.push('бренд в title продублирован');
        }
    }

    if (!page.description) {
        errors.push('нет meta description');
    } else if (!relaxed) {
        const len = page.description.length;
        if (len < LIMITS.descriptionMin || len > LIMITS.descriptionMax) {
            warnings.push(`description ${len} симв. (норма ${LIMITS.descriptionMin}–${LIMITS.descriptionMax})`);
        }
    }

    if (page.h1Texts.length === 0) errors.push('нет H1');
    if (page.h1Texts.length > 1) errors.push(`H1 ${page.h1Texts.length} шт. (должен быть один)`);

    const h1 = page.h1Texts[0];
    if (h1 && page.title) {
        const normalize = (s) => s.toLowerCase().replace(/\s*\|\s*art\.vision\s*$/i, '').trim();
        if (normalize(h1) === normalize(page.title)) {
            warnings.push('H1 дословно повторяет title');
        }
    }

    if (!page.canonical && !NO_CANONICAL_NEEDED.has(page.route)) {
        warnings.push('нет rel=canonical');
    }

    if (page.imgsWithoutAlt > 0) {
        warnings.push(`<img> без alt: ${page.imgsWithoutAlt} из ${page.imgCount}`);
    }
    if (page.externalWithoutNofollow.length) {
        warnings.push(`внешние ссылки без nofollow: ${page.externalWithoutNofollow.join(', ')}`);
    }

    return { errors, warnings };
}

function main() {
    let files;
    try {
        files = walk(BUILD_DIR).sort();
    } catch {
        console.error('Не найден билд. Сначала выполните: npm run build');
        process.exit(1);
    }

    const seenTitles = new Map();
    let errorCount = 0;
    let warningCount = 0;

    console.log(`Проверено страниц: ${files.length}\n`);

    for (const file of files) {
        const page = analyse(file);
        const { errors, warnings } = check(page, seenTitles);
        errorCount += errors.length;
        warningCount += warnings.length;

        if (!errors.length && !warnings.length) continue;

        console.log(`${page.route || '/'}`);
        console.log(`   title (${page.title.length}): ${page.title}`);
        for (const e of errors) console.log(`   ОШИБКА   ${e}`);
        for (const w of warnings) console.log(`   ВНИМАНИЕ ${w}`);
        if (page.jsonLdTypes.length) console.log(`   schema:  ${page.jsonLdTypes.join(', ')}`);
        console.log('');
    }

    console.log(`Итого: ошибок ${errorCount}, предупреждений ${warningCount}`);
    process.exit(errorCount > 0 ? 1 : 0);
}

main();
