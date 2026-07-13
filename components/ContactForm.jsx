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

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', contact: '', projectType: '', budget: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="contact-form" className="relative w-full py-24 bg-black text-white font-sans transition-colors overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-20 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Side: Copy */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 space-y-8"
                    >
                        <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-4">
                            Обратная связь
                        </p>
                        <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-4 uppercase">
                            Готовы Начать Проект?
                        </h2>
                        <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed">
                            Оставьте заявку, и мы свяжемся с вами в течение 30 минут для детального обсуждения вашей задачи.
                        </p>

                        <div className="space-y-6 pt-6">
                            <div className="flex items-center gap-4 p-6 rounded-lg bg-white/[0.02] border border-white/10">
                                <div className="h-12 w-12 rounded bg-white/5 flex items-center justify-center text-white/80">
                                    <Headphones className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-light text-sm uppercase tracking-tight text-white/90">Персональный менеджер</h4>
                                    <p className="text-[11px] text-white/40 uppercase tracking-widest mt-1">Сопровождение на всех этапах</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-6 rounded-lg bg-white/[0.02] border border-white/10">
                                <div className="h-12 w-12 rounded bg-white/5 flex items-center justify-center text-white/80">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-light text-sm uppercase tracking-tight text-white/90">NDA & Гарантии</h4>
                                    <p className="text-[11px] text-white/40 uppercase tracking-widest mt-1">Полная безопасность данных</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7"
                    >
                        <div className="p-8 md:p-12 bg-white/[0.02] border border-white/10 rounded-lg relative overflow-hidden">

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                        className="flex flex-col items-center justify-center text-center py-16 relative"
                                    >
                                        {/* Glowing Background Effect */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none"></div>

                                        <div className="relative mb-8">
                                            <div className="absolute inset-0 bg-violet-500/30 blur-xl rounded-full"></div>
                                            <div className="relative w-24 h-24 bg-gradient-to-br from-violet-600 to-fuchsia-600 border border-violet-400/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                                                <CheckCircle2 className="w-10 h-10 text-white" />
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-light uppercase tracking-tight mb-6 text-white drop-shadow-md">
                                            Заявка успешно отправлена!
                                        </h3>
                                        
                                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-full max-w-sm relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            
                                            <p className="text-white/60 font-light text-xs tracking-[0.15em] uppercase mb-2">
                                                Ваш персональный менеджер:
                                            </p>
                                            <p className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300 mb-6">
                                                Владимир
                                            </p>

                                            <div className="space-y-4">
                                                <a href="mailto:project@art-vision.online" className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors group/link">
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-violet-500/20 transition-colors">
                                                        <MessageSquare className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-light tracking-wide">project@art-vision.online</span>
                                                </a>
                                                <a href="tel:+79804243055" className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors group/link">
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-violet-500/20 transition-colors">
                                                        <Phone className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-light tracking-wide">+7 (980) 424-30-55</span>
                                                </a>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-10 text-white/40 hover:text-white font-medium uppercase text-[10px] tracking-[0.2em] transition-all hover:tracking-[0.25em]"
                                        >
                                            Отправить еще раз
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-light uppercase tracking-[0.15em] text-white/40 ml-4">Ваше имя</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Александр"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-black border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-white/20 focus:border-white/40 outline-none transition-all font-light text-sm"
                                                    />
                                                </div>
                                            </div>
                                            {/* Contact */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-light uppercase tracking-[0.15em] text-white/40 ml-4">Телефон / Telegram</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="+7 (___) ___-__-__"
                                                        value={formData.contact}
                                                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                        className="w-full bg-black border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-white/20 focus:border-white/40 outline-none transition-all font-light text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Project Type */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-light uppercase tracking-[0.15em] text-white/40 ml-4">Тип проекта</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                                    <input
                                                        type="text"
                                                        placeholder="Лендинг / Магазин / Сервис"
                                                        value={formData.projectType}
                                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                        className="w-full bg-black border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-white/20 focus:border-white/40 outline-none transition-all font-light text-sm"
                                                    />
                                                </div>
                                            </div>
                                            {/* Budget */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-light uppercase tracking-[0.15em] text-white/40 ml-4">Примерный бюджет</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 font-light text-xs text-white/40">₽</div>
                                                    <input
                                                        type="text"
                                                        placeholder="от 50 000"
                                                        value={formData.budget}
                                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                        className="w-full bg-black border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-white/20 focus:border-white/40 outline-none transition-all font-light text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-light uppercase tracking-[0.15em] text-white/40 ml-4">Ваше сообщение</label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/40" />
                                                <textarea
                                                    rows="4"
                                                    placeholder="Расскажите немного о ваших целях..."
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full bg-black border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-white/20 focus:border-white/40 outline-none transition-all font-light text-sm resize-none"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full h-16 bg-white text-black font-medium uppercase text-[11px] tracking-widest rounded-lg hover:bg-[#e2e2e6] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
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
                                        
                                        {status === 'error' && (
                                            <div className="p-4 rounded border border-red-500/30 bg-red-500/10 text-red-200 text-sm font-light text-center mt-4">
                                                Произошла ошибка при отправке! Попробуйте позже или напишите на project@art-vision.online.
                                            </div>
                                        )}

                                        <p className="text-[10px] text-center text-white/30 font-light tracking-wide mt-6">
                                            Нажимая кнопку, вы соглашаетесь с Политикой обработки персональных данных.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>

                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
