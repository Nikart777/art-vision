'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { onSpotlightMove } from './premium/spotlight';

const EASE = [0.22, 1, 0.36, 1];

// Скриншоты первых экранов лежат в public/images/cases (1440×960, JPEG).
// Обычный <img>, а не next/image: в standalone-сборке на сервере нет sharp,
// и оптимизатор картинок Next отдавал бы ошибку.
//
// span — ширина карточки в 12-колоночной сетке: флагман на всю ширину,
// затем ряды 7+5, флагман, 5+7, 6+6. light — светлый скриншот, его
// приглушаем сильнее, иначе белый текст подписи на нём не читается.
// accent — цвет свечения флагманской карточки (RGB), в тон сайту клиента.
// Цифры в stats взяты с сайтов самих клиентов.
export const featuredProjects = [
  {
    id: 'medprog',
    title: "MEDPROG",
    category: "Онлайн-платформа для врачей · вебинары и конференции",
    work: "Платформа онлайн-трансляций",
    link: "https://medprogramcenter.com/",
    image: "/images/cases/medprog.jpg",
    span: 'md:col-span-12',
    featured: true,
    accent: '67, 97, 255',
    features: ["Собственный видеоплеер", "Потоковые трансляции", "Чат эфира", "Регистрация и личные кабинеты", "Архив записей", "Расписание мероприятий"],
    stats: [
      { value: "35 000+", label: "врачей в базе" },
      { value: "200+", label: "мероприятий" },
      { value: "2 250", label: "врачей на крупнейшем" },
    ],
  },
  {
    id: 'cyberx',
    title: "CYBERX Community",
    category: "Сеть компьютерных клубов · Москва",
    work: "Сайты сети и онлайн-бронь",
    link: "https://cyberx-novokosino.ru/",
    image: "/images/cases/cyberx.jpg",
    span: 'md:col-span-7',
  },
  {
    id: 'yaroshevich',
    title: "Andrey Yaroshevich",
    category: "Fashion-фотограф · Лос-Анджелес, США",
    work: "Портфолио для рынка США",
    link: "https://www.andreyyaroshevich.com/",
    image: "/images/cases/yaroshevich.jpg",
    span: 'md:col-span-5',
  },
  {
    id: 'bit28',
    title: "28BIT",
    category: "Магазин компьютеров и комплектующих · Москва",
    work: "E-commerce платформа",
    link: "https://28bit.ru/",
    image: "/images/cases/bit28.jpg",
    span: 'md:col-span-12',
    featured: true,
    accent: '40, 90, 255',
    features: ["Конфигуратор сборки ПК", "Каталог с фильтрами", "Сравнение и избранное", "Личный кабинет и заказы", "Светлая и тёмная темы"],
    stats: [
      { value: "1 400+", label: "товаров в каталоге" },
    ],
  },
  {
    id: 'fluditec',
    title: "Флюдитек",
    category: "Фармацевтика · ИННОТЕК",
    work: "Сайт препарата",
    link: "https://fluditec.ru/",
    image: "/images/cases/fluditec.jpg",
    span: 'md:col-span-5',
  },
  {
    id: 'maage',
    title: "МААГЭ",
    category: "Международная ассоциация акушеров-гинекологов и эндокринологов",
    work: "Портал ассоциации",
    link: "https://maage.ru/",
    image: "/images/cases/maage.jpg",
    span: 'md:col-span-7',
    light: true,
  },
  {
    id: 'repost',
    title: "re-post.pro",
    category: "SaaS · кросспостинг из Telegram в MAX",
    work: "Продукт и его сайт — от идеи до запуска",
    link: "https://re-post.pro/",
    image: "/images/cases/repost.jpg",
    span: 'md:col-span-12',
    featured: true,
    badge: "Продукт под ключ",
    accent: '230, 120, 40',
    features: ["Бот автопостинга Telegram → MAX", "Перенос архива канала", "Видео до 2 ГБ, кружочки, голосовые", "Комментарии и платные каналы", "Рассылки", "Тарифы и оплата"],
    stats: [
      { value: "< 3 с", label: "от поста в Telegram до MAX" },
      { value: "24/7", label: "перенос без участия человека" },
      { value: "60 с", label: "на подключение канала" },
    ],
  },
  {
    id: 'lesson24',
    title: "Ясный урок",
    category: "EdTech · сервис для репетиторов",
    work: "SaaS и личный кабинет",
    link: "https://24lesson.ru/",
    image: "/images/cases/lesson24.jpg",
    span: 'md:col-span-6',
    light: true,
  },
  {
    id: 'clubpulse',
    title: "ClubPulse",
    category: "Аналитика для компьютерных клубов",
    work: "SaaS с 3D-картой зала",
    link: "https://clubpulse24.ru/",
    image: "/images/cases/clubpulse.jpg",
    span: 'md:col-span-6',
  },
];

const hostOf = (url) => new URL(url).hostname.replace(/^www\./, '');

// Появление карточки запускает её внешняя обёртка, а внутренние слои
// получают состояние через варианты. Отслеживать сами слои нельзя: шторка
// или clip-path делают их «невидимыми» для IntersectionObserver, и тогда
// не срабатывает ни анимация, ни ленивая загрузка картинки.
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  shown: (i) => ({ opacity: 1, y: 0, transition: { duration: 1.1, delay: (i % 2) * 0.12, ease: EASE } }),
};

const curtainVariants = {
  hidden: { scaleY: 1 },
  shown: (i) => ({ scaleY: 0, transition: { duration: 1.3, delay: 0.2 + (i % 2) * 0.12, ease: [0.76, 0, 0.24, 1] } }),
};

const zoomVariants = {
  hidden: { scale: 1.3 },
  shown: (i) => ({ scale: 1, transition: { duration: 2, delay: 0.2 + (i % 2) * 0.12, ease: EASE } }),
};

// Окно браузера во флагманской карточке «прилетает» из глубины
const mockupVariants = {
  hidden: { opacity: 0, y: 80, rotateX: 18 },
  shown: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1.5, delay: 0.25, ease: EASE } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 12 },
  shown: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 + i * 0.06, ease: EASE } }),
};

// 3D-наклон карточки и блик за курсором. Пружины дают «тяжёлое», дорогое
// движение; на тач-экранах наклона нет, остаётся только подсветка.
function useTilt(strength) {
  const ref = useRef(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 18, mass: 0.6 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 18, mass: 0.6 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(600px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 45%)`;

  const onPointerMove = (e) => {
    onSpotlightMove(e);
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    tiltY.set((px - 0.5) * strength);
    tiltX.set((0.5 - py) * strength);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return { ref, rotateX, rotateY, glare, onPointerMove, onPointerLeave };
}

function Glare({ glare }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: glare }}
    />
  );
}

function ArrowButton({ className = '' }) {
  return (
    <span className={`relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black ${className}`}>
      <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
    </span>
  );
}

const cardLinkClass = 'spotlight group relative block overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

function ProjectCard({ project, index }) {
  const tilt = useTilt(9);

  // Параллакс скриншота внутри карточки при прокрутке
  const { scrollYProgress } = useScroll({ target: tilt.ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <motion.div
      className={`col-span-1 ${project.span} [perspective:1400px]`}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.a
        ref={tilt.ref}
        href={project.link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        className={`${cardLinkClass} h-[340px] sm:h-[400px] lg:h-[460px] bg-white/[0.02]`}
      >
        {/* Скриншот: при появлении отъезжает от зрителя, при прокрутке
            плывёт внутри карточки, при наведении медленно приближается */}
        <motion.div className="absolute inset-x-0 -top-[8%] -bottom-[8%]" style={{ y: imageY }}>
          <motion.div className="h-full w-full" variants={zoomVariants} custom={index}>
            <div className="h-full w-full scale-[1.06] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.14]">
              <img
                src={project.image}
                alt={`Сайт ${project.title} — главная страница`}
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover object-top grayscale-[35%] transition-[filter] duration-700 group-hover:grayscale-0 ${project.light ? 'brightness-[0.55] group-hover:brightness-[0.75]' : 'brightness-[0.8] group-hover:brightness-100'}`}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Шторка, которая уезжает вверх и открывает скриншот снизу */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 origin-top bg-[#070708]"
          variants={curtainVariants}
          custom={index}
        />

        {/* Затемнение под текстом */}
        <div className="absolute inset-0 bg-gradient-to-t from-black from-15% via-black/70 via-45% to-black/0 transition-opacity duration-700 group-hover:opacity-90" />

        <Glare glare={tilt.glare} />

        {/* Адрес сайта — «вкладка браузера» */}
        <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] tracking-wide text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            {hostOf(project.link)}
          </span>
          <span className="text-white/40 text-[12px] tracking-[0.2em]">0{index + 1}</span>
        </div>

        {/* Подпись */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/50">{project.category}</p>
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              <h3 className="text-[26px] sm:text-[34px] lg:text-[40px] font-light uppercase leading-[1] tracking-[-0.02em] text-white transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                {project.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[12px] font-light text-white/85 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-white/60" />
                {project.work}
              </span>
            </div>
            <ArrowButton />
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

// Флагманская карточка: текст и цифры слева, справа — окно браузера
// со скриншотом под 3D-углом, которое выпрямляется при наведении
function FeaturedCard({ project, index }) {
  const tilt = useTilt(5);
  const { scrollYProgress } = useScroll({ target: tilt.ref, offset: ['start end', 'end start'] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const glow = `radial-gradient(70% 90% at 78% 45%, rgba(${project.accent}, 0.38), transparent 70%), radial-gradient(50% 60% at 10% 100%, rgba(${project.accent}, 0.12), transparent 70%)`;

  return (
    <motion.div
      className={`col-span-1 ${project.span} [perspective:1600px]`}
      variants={cardVariants}
      custom={0}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.a
        ref={tilt.ref}
        href={project.link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        className={`${cardLinkClass} bg-[#060608] lg:min-h-[620px]`}
      >
        {/* Цветное свечение в тон проекту, при наведении разгорается */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 transition-opacity duration-1000 group-hover:opacity-100"
          style={{ background: glow }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />

        <Glare glare={tilt.glare} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 sm:p-10 lg:p-14">
          {/* Текст */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between gap-10">
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  <Sparkles className="h-3 w-3" /> {project.badge || 'Флагманский проект'}
                </span>
                <span className="text-white/40 text-[12px] tracking-[0.2em]">0{index + 1}</span>
              </div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/55">{project.category}</p>
              <div className="flex items-center gap-5">
                {/* Длинные названия (re-post.pro) набираем мельче и без переноса */}
                <h3 className={`whitespace-nowrap font-light uppercase leading-[0.95] tracking-[-0.03em] text-white ${project.title.length > 8 ? 'text-[30px] sm:text-[46px] lg:text-[54px]' : 'text-[44px] sm:text-[60px] lg:text-[76px]'}`}>
                  {project.title}
                </h3>
                <ArrowButton />
              </div>
              <p className="mt-5 text-[16px] sm:text-[19px] font-light text-white/85">
                <span className="accent-serif">{project.work}</span>
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    variants={chipVariants}
                    custom={i}
                    className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-[11px] sm:text-[12px] font-light text-white/80 backdrop-blur-md transition-colors duration-500 group-hover:border-white/30"
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <dl className="flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8">
              {project.stats.map((stat) => (
                // flex-col-reverse: в разметке подпись (dt) идёт первой, на экране — под цифрой
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/50">{stat.label}</dt>
                  <dd className="whitespace-nowrap text-[28px] sm:text-[38px] font-light leading-none tracking-[-0.03em] text-white tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Окно браузера со скриншотом */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex items-center [perspective:1600px]">
            <motion.div style={{ y: mockupY }} className="w-full">
              <motion.div
                variants={mockupVariants}
                className="w-full origin-bottom"
              >
                <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 bg-[#0d0d10] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:[transform:rotateY(-14deg)_rotateX(6deg)_rotateZ(1deg)] lg:group-hover:[transform:rotateY(0deg)_rotateX(0deg)_rotateZ(0deg)_scale(1.02)]">
                  <div className="flex h-8 sm:h-9 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="ml-3 truncate rounded-md bg-white/[0.06] px-3 py-0.5 text-[10px] sm:text-[11px] text-white/55">
                      {hostOf(project.link)}
                    </span>
                  </div>
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`Платформа ${project.title} — главная страница`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0 origin-top bg-[#0d0d10]"
                      variants={curtainVariants}
                      custom={0}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

// Сетка карточек проектов. Используется на главной (SelectedWorks)
// и на странице портфолио (app/cases/page.js) — данные одни и те же.
export default function FeaturedProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
      {featuredProjects.map((project, i) => (
        project.featured
          ? <FeaturedCard key={project.id} project={project} index={i} />
          : <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
