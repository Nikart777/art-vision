import Header from '@/components/Header';
import Footer from '@/components/synapsex/Footer';

export const metadata = {
    title: 'Политика конфиденциальности',
    description: 'Политика в отношении обработки персональных данных компании Art.Vision (ООО "АТИМ").',
    alternates: {
        canonical: 'https://art-vision.online/policy/',
    },
};

export default function PolicyPage() {
    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors pt-32 pb-20 relative z-10">
            <div className="max-w-3xl mx-auto px-6 md:px-10">
                <header className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Обработка <span className="text-gradient">персональных данных</span></h1>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Последнее обновление: 20 января 2026</p>
                </header>

                <section className="prose prose-sm md:prose-base dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    <p>
                        Настоящая Политика конфиденциальности описывает, как ООО "АТИМ" (далее — «Компания», «мы») собирает, использует и защищает вашу информацию при использовании веб-сайта art-vision.online.
                    </p>

                    <div>
                        <h2 className="text-xl font-black text-[#101818] dark:text-white uppercase tracking-tight mb-4">1. Сбор информации</h2>
                        <p>Мы собираем информацию, которую вы предоставляете напрямую через формы на сайте: имя, номер телефона, данные о проекте и бюджет. Эти данные необходимы для связи с вами и подготовки коммерческого предложения.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-black text-[#101818] dark:text-white uppercase tracking-tight mb-4">2. Использование данных</h2>
                        <p>Ваши данные используются исключительно для:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Обработки ваших запросов и заявок.</li>
                            <li>Предоставления информации об услугах Компании.</li>
                            <li>Улучшения качества работы нашего веб-сайта.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-black text-[#101818] dark:text-white uppercase tracking-tight mb-4">3. Защита информации</h2>
                        <p>Мы принимаем все необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или удаления.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-black text-[#101818] dark:text-white uppercase tracking-tight mb-4">4. Реквизиты компании</h2>
                        <p className="font-mono text-sm border-l-2 border-primary pl-4">
                            ООО "АТИМ"<br />
                            ИНН: 504226843290<br />
                            КПП: 770901001<br />
                            ОГРН: 1227700259863
                        </p>
                    </div>

                    <p className="pt-8 border-t border-gray-100 dark:border-white/5 text-xs">
                        Если у вас есть вопросы по поводу настоящей политики, пожалуйста, свяжитесь с нами по электронной почте: project@art-vision.online
                    </p>
                </section>
            </div>
        </main>
    );
}
