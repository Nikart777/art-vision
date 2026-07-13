import SynapseXLogo from './SynapseXLogo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black overflow-hidden border-t border-white/5 font-sans">
      <div className="flex flex-col md:flex-row min-h-[500px]">
        {/* Left Video */}
        <div className="w-full md:w-[40%] h-[300px] md:h-auto relative">
          <video 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
        
        {/* Right Content */}
        <div className="w-full md:w-[60%] p-10 sm:p-16 flex flex-col justify-between">
          <div className="flex flex-col xl:flex-row gap-12 justify-between">
            {/* Brand Info */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-8">
                <SynapseXLogo className="w-[18px] h-[18px] text-white/70" />
                <span className="text-[15px] font-medium text-white/70 tracking-tight">Art.Vision</span>
              </div>
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed mb-6">
                Цифровые решения, которые приносят результат. Создаем премиальные сайты под ключ.
              </p>
              <div className="text-white/40 text-sm space-y-1">
                <span className="block font-bold text-white/80">Москва, Тверская 12</span>
                <a href="mailto:project@art-vision.online" className="hover:text-white transition-colors">project@art-vision.online</a>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-12 md:gap-20">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white/20">Навигация</h4>
                <ul className="space-y-3">
                  <li><Link href="/#services" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">Услуги</Link></li>
                  <li><Link href="/cases/" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">Портфолио</Link></li>
                  <li><Link href="/reviews/" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">Отзывы</Link></li>
                  <li><Link href="/about/" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">О компании</Link></li>
                  <li><Link href="/blog/" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">Блог</Link></li>
                  <li><Link href="/faq/" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">Вопросы (FAQ)</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white/20">Документы</h4>
                <ul className="space-y-3">
                  <li><Link href="/policy/" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">Политика</Link></li>
                  <li><Link href="/terms/" className="text-sm font-semibold text-white/40 hover:text-white transition-colors">Оферта</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Info */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 text-white/25 text-[11px] sm:text-[12px]">
            <p>&copy; 2026 Art.Vision Digital Agency. Все права защищены.</p>
            <div className="flex flex-col items-start xl:items-end gap-1 font-mono uppercase tracking-widest">
              <span>ООО "АТИМ"</span>
              <span>ИНН 504226843290 | КПП 770901001 | ОГРН 1227700259863</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
