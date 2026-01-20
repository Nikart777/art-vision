import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Manifesto from '@/components/Manifesto';
import Team from '@/components/Team';
import TechStack from '@/components/TechStack';
import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: 'О компании Art.Vision | Премиальная веб-разработка',
    description: 'Узнайте о нашей философии, команде и технологическом стеке. Мы создаем эффективные диджитал-решения для бизнеса с 2018 года.',
    alternates: {
        canonical: 'https://art-vision.online/about/',
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors selection:bg-primary/30">
            <div className="pt-20">
                {/* HERO SECTION FOR ABOUT */}
                <section className="py-24 px-6 md:px-10 lg:px-20 border-b border-gray-100 dark:border-white/5">
                    <div className="max-w-[1200px] mx-auto text-center animate-fade-in">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="h-px w-8 bg-primary"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-primary">История Art.Vision</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-gradient uppercase">
                            Мы верим в силу <br /> чистого кода
                        </h1>
                        <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
                            С 2018 года мы прошли путь от маленькой команды до агентства полного цикла, сохранив главное — персональный подход к каждому пикселю.
                        </p>
                    </div>
                </section>

                <Manifesto />
                <Team />

                {/* TECHNOLOGY FOCUS */}
                <div className="py-32 px-6 md:px-10 lg:px-20 bg-gray-50 dark:bg-white/[0.02]">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Наш <span className="text-gradient">Инструментарий</span></h2>
                                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                                    Мы не используем конструкторы или готовые шаблоны. Наш стек — это передовые технологии, которые гарантируют вашему сайту место в топе Google PageSpeed.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                                        <span className="font-bold">Next.js 14 & React Server Components</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                                        <span className="font-bold">Tailwind CSS & Framer Motion</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                                        <span className="font-bold">GSAP for complex cinematic motions</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <TechStack />
                            </div>
                        </div>
                    </div>
                </div>

                <ContactForm />
            </div>
        </main>
    );
}
