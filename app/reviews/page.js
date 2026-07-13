import Clients from '@/components/Clients';
import ContactForm from '@/components/ContactForm';
import Reviews from '@/components/Reviews';
import { Sparkles } from 'lucide-react';
import Navbar from '@/components/synapsex/Navbar';
import Footer from '@/components/synapsex/Footer';

export const metadata = {
    title: 'Отзывы клиентов — репутация и результаты',
    description: 'Честные отзывы наших клиентов о разработке на Next.js, SEO-продвижении и внедрении IT-решений. Посмотрите, как мы помогаем бизнесу расти.',
    alternates: {
        canonical: 'https://art-vision.online/reviews/',
    },
};

export default function ReviewsPage() {
    return (
        <main className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            {/* Dark gradient overlay matching the main page */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

            <Navbar entranceComplete={true} />

            <div className="relative z-10 pt-32 pb-20">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 relative">

                    {/* DECORATIVE ELEMENTS */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <Reviews isH1={true} />

                    {/* TRUST SECTION */}
                    <div className="py-24 border-t border-white/10 mt-20">
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
                            <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center text-white backdrop-blur-xl border border-white/20">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">Ваш отзыв может быть <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">Следующим</span></h2>
                            <p className="text-white/60 font-light text-lg leading-relaxed">
                                Мы нацелены на результат, о котором вам захочется рассказать. Каждый проект для нас — это возможность создать новую историю успеха.
                            </p>
                        </div>
                    </div>

                    <div className="mb-24 scale-105 relative z-20 mix-blend-screen opacity-70 filter contrast-125">
                        <Clients />
                    </div>

                </div>
            </div>

            <ContactForm />
            <Footer />
        </main>
    );
}

