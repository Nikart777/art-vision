import Link from 'next/link';
import { casesData } from '@/data/cases';
import { ArrowUpRight, Folder, LayoutGrid, Target, TrendingUp, ChevronRight } from 'lucide-react';
import Navbar from '@/components/synapsex/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/synapsex/Footer';
import FeaturedProjects from '@/components/FeaturedProjects';
import CountUp from '@/components/premium/CountUp';

// Сколько ещё проектов в портфолио помимо избранных (цифра от владельца студии)
const MORE_PROJECTS = 46;

// Отрасли, в которых студия уже работала, — по избранным проектам и разборам ниже
const INDUSTRIES = ['Медицина', 'Фармацевтика', 'E-commerce', 'EdTech', 'SaaS', 'Игровая индустрия', 'Fintech', 'Фотография и медиа', 'Ассоциации и НКО', 'Сфера услуг'];

export const metadata = {
    title: 'Кейсы — наши работы и результаты клиентов',
    description: 'Портфолио Art.Vision: платформа трансляций MEDPROG, e-commerce 28BIT, SaaS re-post.pro, МААГЭ, Флюдитек, CYBERX Community и ещё 46 проектов для бизнеса.',
    alternates: {
        canonical: 'https://24art-vision.ru/cases/',
    },
};

export default function CasesListPage() {
    const cases = Object.entries(casesData).map(([slug, data]) => ({
        slug,
        ...data
    }));

    return (
        <main className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            {/* Dark gradient overlay matching the main page */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

            <Navbar entranceComplete={true} />

            <div className="relative z-10 pt-32 pb-24">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
                    <header className="mb-20 animate-fade-in flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide uppercase">
                                Портфолио
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tight mb-8 leading-[1.1] uppercase">
                            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">Кейсы</span>
                        </h1>
                        <p className="max-w-2xl text-white/70 font-light text-lg md:text-xl leading-relaxed">
                            Платформы, сервисы, e-commerce и сайты флагманского уровня — для компаний и организаций, которым важен результат и уровень исполнения.
                        </p>
                    </header>

                    {/* Избранные проекты — та же витрина, что на главной */}
                    <section className="mb-32">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
                            <h2 className="text-white font-light text-[clamp(28px,5vw,48px)] leading-[1.1] tracking-[-0.02em] uppercase">
                                Избранные <span className="accent-serif">проекты</span>
                            </h2>
                            <p className="max-w-md text-white/45 text-[15px] leading-relaxed md:text-right">
                                Платформы, продукты и сайты, которыми мы гордимся больше всего.
                            </p>
                        </div>
                        <FeaturedProjects />
                    </section>

                    {/* Остальное портфолио: без поимённого списка, кейсы подбираем под отрасль клиента */}
                    <section className="relative mb-32 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] px-6 py-14 sm:px-12 md:px-16 md:py-20">
                        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/[0.06] blur-[120px]" />
                        <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                            <div className="lg:col-span-5">
                                <p className="text-white/40 text-[13px] tracking-[0.2em] uppercase mb-6">И это не всё</p>
                                <h2 className="flex flex-col items-start gap-1 text-white font-light leading-none tracking-[-0.04em]">
                                    <span className="text-[clamp(88px,14vw,180px)]">
                                        <CountUp to={MORE_PROJECTS} prefix="+" />
                                    </span>
                                    {/* Кегль на обёртке: .accent-serif считает размер в em от родителя */}
                                    <span className="text-[clamp(32px,4.5vw,56px)]">
                                        <span className="accent-serif">проектов</span>
                                    </span>
                                </h2>
                            </div>
                            <div className="lg:col-span-7">
                                <p className="text-white/70 text-[16px] sm:text-[19px] font-light leading-relaxed mb-8">
                                    Корпоративные сайты, интернет-магазины, личные кабинеты, Telegram-боты и промо-проекты для компаний из разных отраслей. Подберём кейсы из вашей сферы и разберём их на встрече — с решениями, сроками и результатами.
                                </p>
                                <ul className="flex flex-wrap gap-2 mb-10">
                                    {INDUSTRIES.map((industry) => (
                                        <li key={industry} className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[12px] font-light text-white/75">
                                            {industry}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#contact-form"
                                    className="btn-shine inline-flex h-14 items-center rounded-full bg-white px-9 text-[12px] font-bold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                                >
                                    Запросить кейсы из вашей отрасли
                                </a>
                            </div>
                        </div>
                    </section>

                    <h2 className="text-white font-light text-[clamp(28px,5vw,48px)] leading-[1.1] tracking-[-0.02em] uppercase mb-12">
                        Разборы <span className="accent-serif">проектов</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {cases.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/cases/${item.slug}/`}
                                className="group relative flex flex-col rounded-[2.5rem] bg-white/[0.02] border border-white/10 overflow-hidden p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-500 shadow-xl backdrop-blur-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative aspect-video rounded-[2rem] bg-black border border-white/10 overflow-hidden mb-8 shadow-inner">
                                    <div className="absolute inset-0 flex items-center justify-center text-white/5 text-6xl font-black uppercase tracking-tighter">
                                        {item.industry}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                                    <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl group-hover:rotate-45">
                                        <ArrowUpRight className="w-8 h-8" />
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center gap-3 mb-4">
                                    <div className="p-1.5 bg-white/10 rounded-lg text-white">
                                        <Folder className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                                        {item.industry}
                                    </span>
                                </div>

                                <h3 className="relative z-10 text-2xl md:text-3xl font-bold tracking-tight mb-4 leading-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {item.h1 || item.title}
                                </h3>

                                <p className="relative z-10 text-white/50 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                                    {item.challenge}
                                </p>

                                <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        {item.result.split('.')[0]}
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors flex items-center gap-1">
                                        Подробнее <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* SEO CONTENT SECTION */}
                    <section className="mt-32 bg-white/[0.02] border border-white/10 p-10 md:p-20 rounded-[3.5rem] shadow-xl backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

                        <div className="max-w-4xl mx-auto relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-white/10 rounded-2xl text-white">
                                    <Target className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white m-0 uppercase">
                                    Эффективные решения
                                </h2>
                            </div>
                            <div className="prose prose-invert prose-lg max-w-none text-white/60 font-light">
                                <p className="leading-relaxed">
                                    Портфолио Art.Vision — это платформы онлайн-трансляций, SaaS-продукты, e-commerce с конфигураторами, порталы медицинских ассоциаций и сайты флагманского уровня. Мы проектируем и разрабатываем цифровые продукты, которые работают на рост компании и находятся в поиске и в ответах нейросетей.
                                </p>
                                <h3 className="text-xl font-bold tracking-tight text-white mt-12 mb-4 uppercase">Как мы работаем над кейсами?</h3>
                                <p className="leading-relaxed">
                                    Каждая работа в нашем списке — это результат глубокой аналитики ниши. Например, при разработке сайта стоматологии мы делаем упор на онлайн-запись (Yclients) и доверие через профили врачей. В строительном бизнесе мы внедряем интерактивные калькуляторы и квизы, чтобы "зацепить" пользователя на этапе расчета цены. Наша цель — максимальная прозрачность и измеримый результат (ROI).
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
                                <div className="flex flex-col gap-2">
                                    <div className="font-bold text-4xl text-white tracking-tighter">+45%</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Средний рост лидов</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-bold text-4xl text-white tracking-tighter">GEO</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Видимость в ответах нейросетей</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-bold text-4xl text-white tracking-tighter">100%</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Гарантия на код</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <ContactForm />
            <Footer />
        </main>
    );
}

