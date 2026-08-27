import Navbar from '@/components/synapsex/Navbar';
import Footer from '@/components/synapsex/Footer';
import ContactForm from '@/components/ContactForm';
import { HelpCircle, ChevronDown } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
    title: 'Частые вопросы о разработке сайтов и SEO',
    description: 'Отвечаем на частые вопросы о создании сайтов на Next.js: сроки и цена разработки, интеграция с CRM, SEO-база, поддержка после запуска. ✔ 6 честных ответов.',
    alternates: {
        canonical: 'https://art-vision.online/faq/',
    },
};

const faqs = [
  {
    question: "Сколько времени занимает разработка корпоративного сайта или интернет-магазина?",
    answer: "Сроки разработки сайта зависят от сложности функционала. Создание корпоративного сайта с уникальным дизайном на Next.js занимает от 3 до 6 недель. Разработка сложного интернет-магазина (e-commerce) с интеграцией CRM, 1C и платежных систем требует от 2 месяцев. Мы всегда фиксируем сроки в договоре и работаем по спринтам."
  },
  {
    question: "Почему вы используете Next.js и React вместо WordPress, Tilda или Bitrix?",
    answer: "Next.js обеспечивает феноменальную скорость загрузки и идеальные показатели Core Web Vitals, что критически важно для SEO-оптимизации. В отличие от конструкторов (Tilda) или устаревших CMS (Bitrix, WordPress), сайты на React/Next.js более безопасны, легко масштабируются под высокие нагрузки и позволяют внедрять сложные анимации без потери производительности."
  },
  {
    question: "Входит ли базовая SEO-оптимизация в стоимость создания сайта?",
    answer: "Да, каждый проект, который мы выпускаем, уже имеет техническую SEO-базу. Это правильная структура заголовков (H1-H6), семантическая верстка, генерация Sitemap.xml и Robots.txt, микроразметка Schema.org, а также автоматическая оптимизация изображений в WebP/AVIF. Сайт полностью готов к продвижению в Яндекс и Google с первого дня запуска."
  },
  {
    question: "Как происходит интеграция сайта с CRM (AmoCRM, Bitrix24) и аналитикой?",
    answer: "Интеграция с бизнес-системами настраивается через API. Все заявки с форм захвата, заказы из корзины и звонки автоматически попадают в вашу CRM-систему (AmoCRM, Битрикс24) с нужными UTM-метками. Для сквозной аналитики мы подключаем Яндекс.Метрику, Google Analytics 4 и пиксели рекламных сетей."
  },
  {
    question: "Оказываете ли вы услуги по поддержке сайта после его запуска?",
    answer: "Да, мы предоставляем техническую поддержку и SLA (Service Level Agreement). Это включает мониторинг аптайма, регулярное обновление зависимостей, резервное копирование и доработку нового функционала. Ваш цифровой продукт всегда будет в идеальном техническом состоянии."
  },
  {
    question: "Вы делаете адаптивный дизайн (Mobile First)?",
    answer: "Безусловно. До 80% трафика в B2C и e-commerce сегодня приходит со смартфонов. Мы проектируем интерфейсы по принципу Mobile First, обеспечивая идеальное отображение сайта на любых мобильных устройствах, планшетах и сверхшироких мониторах."
  }
];

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            {/* Dark gradient overlay */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

            <JsonLd data={faqJsonLd} />
            <Navbar entranceComplete={true} />

            <div className="relative z-10 pt-32 pb-20">
                <article className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
                    
                    {/* Header Section */}
                    <header className="max-w-4xl mx-auto mb-24 text-center animate-fade-in pt-10">
                        <Breadcrumbs className="flex justify-center mb-8" items={[{ name: 'Вопросы и ответы' }]} />

                        <div className="flex justify-center flex-wrap gap-2 mb-8">
                            <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-white/5 border border-white/10 text-white/50 rounded-full">
                                #Вопросы-ответы
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-white/5 border border-white/10 text-white/50 rounded-full">
                                #Разработка-сайтов
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[1] mb-10 uppercase text-white drop-shadow-2xl">
                            Ответы на <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-500 to-white">Частые вопросы</span>
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                            Всё, что вам нужно знать о процессе разработки премиальных сайтов, сроках, технологическом стеке Next.js и результатах для бизнеса.
                        </p>
                    </header>

                    {/* FAQ Grid */}
                    <div className="max-w-4xl mx-auto space-y-6">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] cursor-pointer">
                                <summary className="flex items-center justify-between p-8 md:p-10 list-none font-bold text-xl md:text-2xl tracking-tight leading-tight uppercase text-white [&::-webkit-details-marker]:hidden">
                                    <span className="pr-8">{faq.question}</span>
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-open:-rotate-180 transition-transform duration-500 border border-white/10 group-hover:bg-white/20">
                                        <ChevronDown className="w-6 h-6 text-white" />
                                    </div>
                                </summary>
                                <div className="px-8 pb-10 md:px-10 md:pb-12 text-white/60 font-light leading-relaxed text-base md:text-lg border-t border-white/5 mt-2 pt-8">
                                    <p>{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* SEO Content block below FAQs */}
                    <section className="max-w-4xl mx-auto mt-32 border-t border-white/10 pt-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                <HelpCircle className="text-white w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
                                Индивидуальная веб-разработка и гарантии
                            </h2>
                        </div>
                        <div className="prose prose-invert prose-lg max-w-none text-white/60 font-light">
                            <p className="leading-relaxed">
                                Заказывая создание сайта в нашем агентстве, вы инвестируете в масштабируемую IT-архитектуру. В отличие от шаблонных решений, <strong className="text-white font-bold">разработка сайтов на Next.js и React</strong> позволяет достичь максимальной скорости работы интерфейса. Это напрямую влияет на поведенческие факторы: пользователи не уходят с сайта из-за долгой загрузки, а поисковые системы ранжируют такой ресурс значительно выше.
                            </p>
                            <h3 className="text-xl font-bold tracking-tight text-white mt-12 mb-4 uppercase">Комплексное SEO-продвижение на этапе создания</h3>
                            <p className="leading-relaxed">
                                Мы закладываем фундамент <em className="text-white">технического SEO</em> еще на этапе написания кода. Правильная настройка Server-Side Rendering (SSR) в Next.js позволяет поисковикам мгновенно индексировать весь контент корпоративного портала или интернет-магазина. Это сокращает время выхода в ТОП поисковой выдачи Яндекса и Google и экономит бюджет на контекстную рекламу.
                            </p>
                            <p className="leading-relaxed">
                                Если у вас остались специфические вопросы касательно интеграции CRM, разработки личных кабинетов или внедрения сквозной аналитики, мы готовы провести технический аудит вашего проекта и предложить лучшее решение.
                            </p>
                        </div>
                    </section>
                </article>
            </div>

            <ContactForm />
            <Footer />
        </main>
    );
}
