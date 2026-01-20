'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Phone, MessageSquare, Briefcase, CheckCircle2, Loader2, Headphones, ShieldCheck } from 'lucide-react';

export default function ContactForm({ initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        projectType: '',
        budget: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                ...prev,
                projectType: initialData.summary || prev.projectType,
                budget: initialData.total ? `${initialData.total} ₽` : prev.budget
            }));
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', contact: '', projectType: '', budget: '', message: '' });
        }, 2000);
    };

    return (
        <section id="contact-form" className="relative w-full py-24 bg-background-light dark:bg-background-dark/50 transition-colors">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Side: Copy */}
                    <div className="lg:col-span-5 space-y-8 animate-fade-in">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-primary"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-primary">Обратная связь</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            Готовы <br /> <span className="text-gradient">Начать Проект?</span>
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            Оставьте заявку, и мы свяжемся с вами в течение 30 минут для детального обсуждения вашей задачи.
                        </p>

                        <div className="space-y-6 pt-6">
                            <div className="flex items-center gap-4 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Headphones className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Персональный менеджер</h4>
                                    <p className="text-xs text-gray-400">Сопровождение на всех этапах</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
                                <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">NDA & Гарантии</h4>
                                    <p className="text-xs text-gray-400">Полная безопасность данных</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7">
                        <div className="p-8 md:p-12 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[3rem] shadow-2xl shadow-primary/5 relative overflow-hidden">

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30">
                                            <CheckCircle2 className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tight mb-2">Заявка принята!</h3>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">Мы перезвоним вам в ближайшее время.</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-8 text-primary font-black uppercase text-[10px] tracking-widest hover:underline"
                                        >
                                            Отправить еще раз
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Ваше имя</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Александр"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                            {/* Contact */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Телефон / Telegram</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="+7 (___) ___-__-__"
                                                        value={formData.contact}
                                                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Project Type */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Тип проекта</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Лендинг / Магазин / Сервис"
                                                        value={formData.projectType}
                                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                            {/* Budget */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Примерный бюджет</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-xs text-gray-400">₽</div>
                                                    <input
                                                        type="text"
                                                        placeholder="от 50 000"
                                                        value={formData.budget}
                                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Ваше сообщение</label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                                <textarea
                                                    rows="4"
                                                    placeholder="Расскажите немного о ваших целях..."
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all font-medium resize-none"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full h-16 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {status === 'loading' ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Отправить Заявку
                                                </>
                                            )}
                                        </button>

                                        <p className="text-[10px] text-center text-gray-400 font-medium">
                                            Нажимая кнопку, вы соглашаетесь с Политикой обработки персональных данных.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
