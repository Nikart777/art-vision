import Navbar from '@/components/synapsex/Navbar';
import Footer from '@/components/synapsex/Footer';
import Manifesto from '@/components/Manifesto';
import Team from '@/components/Team';
import TechStack from '@/components/TechStack';
import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: 'О компании — премиальная веб-разработка',
    description: 'Узнайте о нашей философии, команде и технологическом стеке. Мы создаем эффективные диджитал-решения для бизнеса с 2018 года.',
    alternates: {
        canonical: 'https://art-vision.online/about/',
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            {/* Dark gradient overlay matching the main page */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

            <Navbar entranceComplete={true} />

            <div className="relative z-10 pt-20">
                {/* HERO SECTION FOR ABOUT */}
                <section className="relative py-32 px-6 md:px-10 lg:px-20 border-b border-white/10 overflow-hidden min-h-[70vh] flex items-center justify-center">
                    
                    {/* Background Video inside Hero */}
                    <div className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-40 filter grayscale contrast-125"
                        >
                            <source
                                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
                                type="video/mp4"
                            />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                    </div>

                    <div className="relative z-10 max-w-[1400px] mx-auto text-center animate-fade-in">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-white tracking-wide uppercase">
                                    История Art.Vision
                                </span>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[1] mb-10 text-white uppercase drop-shadow-2xl">
                            Мы верим в силу <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-500 to-white">чистого кода</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-xl text-white/60 font-light leading-relaxed">
                            С 2018 года мы прошли путь от маленькой команды до агентства полного цикла, сохранив главное — персональный подход к каждому пикселю.
                        </p>
                    </div>
                </section>

                <Manifesto />
                <Team />

                {/* TECHNOLOGY FOCUS */}
                <div className="py-32 px-6 md:px-10 lg:px-20 bg-black border-y border-white/10">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white">Наш <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Инструментарий</span></h2>
                                <p className="text-lg text-white/50 font-light leading-relaxed">
                                    Мы не используем конструкторы или готовые шаблоны. Наш стек — это передовые технологии, которые гарантируют вашему сайту место в топе Google PageSpeed.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
                                        <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                                        <span className="font-bold text-white tracking-wide">Next.js 14 & React Server Components</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
                                        <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                                        <span className="font-bold text-white tracking-wide">Tailwind CSS & Framer Motion</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
                                        <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                                        <span className="font-bold text-white tracking-wide">GSAP for complex cinematic motions</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-white/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                <TechStack />
                            </div>
                        </div>
                    </div>
                </div>

                <ContactForm />
                <Footer />
            </div>
        </main>
    );
}

