import Navbar from '@/components/synapsex/Navbar';
import Services from '@/components/Services';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/synapsex/Footer';

export const metadata = {
    title: 'Услуги — Разработка сайтов под ключ',
    description: 'Создание конверсионных сайтов, интернет-магазинов и веб-сервисов на Next.js. Узнайте стоимость и закажите премиальную разработку.',
    alternates: {
        canonical: 'https://art-vision.online/services/',
    },
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            {/* Dark gradient overlay matching the main page */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />

            <Navbar entranceComplete={true} />
            
            <div className="relative z-20 pt-20">
                <Services />
                <ContactForm />
                <Footer />
            </div>
        </main>
    );
}
