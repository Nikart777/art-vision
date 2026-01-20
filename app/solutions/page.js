import Link from 'next/link';
import { solutions } from '@/data/solutions';
import {
    Hammer,
    Car,
    Armchair,
    Scissors,
    Truck,
    GraduationCap,
    ArrowRight,
    LayoutGrid,
    CheckCircle2,
    Briefcase
} from 'lucide-react';

const iconMap = {
    Hammer: Hammer,
    Car: Car,
    Armchair: Armchair,
    Scissors: Scissors,
    Truck: Truck,
    GraduationCap: GraduationCap
};

export const metadata = {
    title: 'Готовые решения для бизнеса | Art.Vision',
    description: 'Отраслевые решения по разработке сайтов. Сайт для автосервиса, застройщика, стоматологии и мебельного производства. Запуск за 5 дней с гарантией результата.',
    alternates: {
        canonical: 'https://art-vision.online/solutions/',
    },
};

export default function SolutionsListPage() {
    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-300 pt-32 pb-20">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
                <header className="mb-20 animate-fade-in">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Нишевые Стратегии</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Отраслевые <span className="text-gradient">Решения</span>
                    </h1>
                    <p className="max-w-2xl text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
                        Мы не изобретаем велосипед для каждого проекта. Мы берем проверенную архитектуру вашей ниши и адаптируем её под ваш бренд.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {solutions.map((item) => {
                        const Icon = iconMap[item.icon] || Hammer;
                        return (
                            <Link
                                key={item.slug}
                                href={`/solutions/${item.slug}/`}
                                className="group p-10 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="p-4 w-fit bg-primary/10 rounded-2xl text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-black tracking-tight mb-4 leading-tight group-hover:text-primary transition-colors">
                                    {item.h1 || item.title}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-10 line-clamp-3">
                                    {item.heroSub}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Industry Focus</span>
                                    <div className="text-xs font-black uppercase tracking-widest text-[#101818] dark:text-white group-hover:text-primary transition-all flex items-center gap-2">
                                        Решение <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* STAR METHOD SEO SECTION */}
                <section className="mt-40 border-t border-gray-100 dark:border-white/5 pt-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-10 animate-fade-in">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <Briefcase className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight m-0">
                                Стоимость разработки сайта <br /> <span className="text-gradient">для вашего бизнеса</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-12">
                            <div className="space-y-6">
                                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">1</span>
                                    Сфера услуг и локальный бизнес
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-6">
                                    Мы предлагаем фиксированные цены на <strong>создание сайта для автосервиса, стоматологии или салона красоты</strong>. Наши решения уже включают в себя онлайн-запись, прайс-листы и интеграцию с картами.
                                </p>
                                <ul className="space-y-3">
                                    {['Разработка сайта для юристов и адвокатов', 'Создание сайта для школы или учебного центра', 'Лендинг для психолога или частного мастера'].map(li => (
                                        <li key={li} className="flex items-center gap-3 text-sm font-bold text-gray-500 dark:text-gray-400">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">2</span>
                                    Производство и недвижимость
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-6">
                                    Сложные ниши требуют глубокой проработки. <strong>Эффективный лендинг для застройщика или мебельного производства</strong> должен содержать калькулятор расчета и качественное портфолио.
                                </p>
                                <ul className="space-y-3">
                                    {['Сайт для агентства недвижимости под ключ', 'Разработка для транспортных и логистических компаний', 'Корпоративный сайт для отеля или базы отдыха'].map(li => (
                                        <li key={li} className="flex items-center gap-3 text-sm font-bold text-gray-500 dark:text-gray-400">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-20 p-10 md:p-16 bg-white/40 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[3.5rem] shadow-sm">
                            <h3 className="text-2xl font-black tracking-tight mb-6 uppercase italic">Почему выбирают наши отраслевые решения?</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-lg">
                                Когда вы заказываете <strong>создание сайта для бизнеса под ключ</strong> в Art.Vision, вы получаете не просто код, а готовую маркетинговую связку. Мы знаем, какие триггеры работают в вашей нише, и внедряем их "из коробки". Это позволяет сократить срок разработки и снизить стоимость в 2-3 раза.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
