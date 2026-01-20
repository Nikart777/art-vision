'use client';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';

export default function AboutSection() {
    return (
        <section id="about" className="relative w-full py-24 bg-background-light dark:bg-background-dark transition-colors overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* LEFT: CONTENT */}
                    <div className="lg:col-span-7 space-y-8 animate-fade-in">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-primary"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-primary">О компании</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
                            Делаем Диджитал <br />
                            <span className="text-gradient">Инструментом Роста</span>
                        </h2>

                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
                            Art.Vision — это команда экспертов, объединенных страстью к чистому коду и высокому дизайну. Мы ломаем стереотип о том, что премиальная разработка доступна только корпорациям.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="flex items-start gap-4 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base mb-1">Надежность</h4>
                                    <p className="text-xs text-gray-400">Работа по договору и четкое соблюдение сроков.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base mb-1">Скорость</h4>
                                    <p className="text-xs text-gray-400">Запуск лендинга от 5 рабочих дней.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Link
                                href="/about/"
                                className="group inline-flex items-center gap-3 px-8 py-5 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Узнать больше о нас
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: STATS BENTO */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                        <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 flex flex-col justify-end min-h-[180px] shadow-sm">
                            <div className="text-4xl font-black text-primary mb-2">2018</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Год основания</div>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-primary text-white flex flex-col justify-end min-h-[180px] shadow-xl shadow-primary/20">
                            <div className="text-4xl font-black mb-2">120+</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Проектов сдано</div>
                        </div>
                        <div className="col-span-2 p-8 rounded-[2rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Heart className="w-6 h-6 fill-primary" />
                                </div>
                                <div>
                                    <div className="font-black text-xl tracking-tight">70%</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Return Rate</div>
                                </div>
                            </div>
                            <div className="text-right text-[10px] font-bold text-gray-400 max-w-[100px] leading-tight uppercase">
                                Нам доверяют развитие бизнеса
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
