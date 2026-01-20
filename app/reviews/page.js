import Clients from '@/components/Clients';
import ContactForm from '@/components/ContactForm';
import Reviews from '@/components/Reviews';
import { Sparkles } from 'lucide-react';

export const metadata = {
    title: 'Отзывы клиентов Art.Vision | Репутация и Результаты',
    description: 'Честные отзывы наших клиентов о разработке на Next.js, SEO-продвижении и внедрении IT-решений. Посмотрите, как мы помогаем бизнесу расти.',
    alternates: {
        canonical: 'https://art-vision.online/reviews/',
    },
};

export default function ReviewsPage() {
    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors pt-32 pb-20 overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 relative">

                {/* DECORATIVE ELEMENTS */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

                <Reviews />

                {/* TRUST SECTION */}
                <div className="py-24 border-t border-gray-100 dark:border-white/5">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
                        <div className="h-16 w-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Ваш отзыв может быть <span className="text-gradient">Следующим</span></h2>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">
                            Мы нацелены на результат, о котором вам захочется рассказать. Каждый проект для нас — это возможность создать новую историю успеха.
                        </p>
                    </div>
                </div>

                <div className="mb-24 scale-105">
                    <Clients />
                </div>

                <ContactForm />
            </div>
        </main>
    );
}
