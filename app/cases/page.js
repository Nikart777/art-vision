import Link from 'next/link';
import { casesData } from '@/data/cases';
import { ArrowUpRight, Folder, LayoutGrid, Target, TrendingUp, ChevronRight } from 'lucide-react';

export const metadata = {
    title: 'Кейсы Art.Vision | Наши работы и результаты клиентов',
    description: 'Портфолио digital-агентства Art.Vision. Примеры разработки сайтов для бизнеса, медицинских клиник, финтеха и сферы услуг с реальными показателями роста.',
    alternates: {
        canonical: 'https://art-vision.online/cases/',
    },
};

export default function CasesListPage() {
    const cases = Object.entries(casesData).map(([slug, data]) => ({
        slug,
        ...data
    }));

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-24 relative z-10">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
                <header className="mb-20 animate-fade-in">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Портфолио</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Наши <span className="text-gradient">Кейсы</span>
                    </h1>
                    <p className="max-w-2xl text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
                        Мы не просто делаем сайты, мы решаем проблемы бизнеса. Каждый кейс — это история трансформации в эффективный инструмент продаж.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    {cases.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/cases/${item.slug}/`}
                            className="group relative flex flex-col"
                        >
                            <div className="relative aspect-video rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:border-primary/20 transition-all duration-700">
                                {/* Placeholder / Industry Icon */}
                                <div className="absolute inset-0 flex items-center justify-center text-primary/10 text-6xl font-black uppercase tracking-tighter">
                                    {item.industry}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-light/40 dark:from-background-dark/80 to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

                                <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white dark:bg-background-dark border border-gray-100 dark:border-white/10 flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-500 shadow-xl group-hover:rotate-45">
                                    <ArrowUpRight className="w-8 h-8 text-primary" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                                    <Folder className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                    {item.industry}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 leading-tight group-hover:text-primary transition-colors">
                                {item.h1 || item.title}
                            </h2>

                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                                {item.challenge}
                            </p>

                            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[10px] font-black uppercase tracking-widest">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    {item.result.split('.')[0]}
                                </div>
                                <div className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors flex items-center gap-1">
                                    Подробнее <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* SEO CONTENT SECTION */}
                <section className="mt-40 bg-white/40 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-10 md:p-20 rounded-[3.5rem] shadow-sm">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight m-0">
                                Эффективные ИТ-решения для малого бизнеса
                            </h2>
                        </div>
                        <div className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-gray-400 font-medium">
                            <p className="leading-relaxed">
                                Портфолио Art.Vision включает проекты разной сложности: от быстрых лендингов для локальных автосервисов до высоконагруженных финтех-платформ и медицинских порталов. Мы специализируемся на разработке сайтов, которые не просто висят в сети, а активно привлекают клиентов из поиска.
                            </p>
                            <h3 className="text-xl font-black tracking-tight text-[#101818] dark:text-white mt-12 mb-4 uppercase">Как мы работаем над кейсами?</h3>
                            <p className="leading-relaxed">
                                Каждая работа в нашем списке — это результат глубокой аналитики ниши. Например, при разработке сайта стоматологии мы делаем упор на онлайн-запись (Yclients) и доверие через профили врачей. В строительном бизнесе мы внедряем интерактивные калькуляторы и квизы, чтобы "зацепить" пользователя на этапе расчета цены. Наша цель — максимальная прозрачность и измеримый результат (ROI).
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-100 dark:border-white/5">
                            <div className="flex flex-col gap-1">
                                <div className="font-black text-3xl text-primary tracking-tighter">+45%</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Средний рост лидов</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="font-black text-3xl text-primary tracking-tighter">5 Дней</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Минимальный срок запуска</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="font-black text-3xl text-primary tracking-tighter">100%</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Гарантия на код</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
