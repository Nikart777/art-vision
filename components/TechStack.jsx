'use client';

const benefits = [
  {
    id: "01",
    title: "Скорость Загрузки",
    value: "< 0.5 сек",
    desc: "Google любит быстрые сайты. Мы используем Next.js, чтобы ваш сайт открывался мгновенно. Это напрямую влияет на стоимость клика и позиции в поиске.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    )
  },
  {
    id: "02",
    title: "SEO Фундамент",
    value: "TOP-10",
    desc: "Сайт собирается так, чтобы роботы Яндекса и Google читали его идеально. Правильная семантика и мета-теги уже включены в стоимость.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    )
  },
  {
    id: "03",
    title: "Mobile First",
    value: "100%",
    desc: "80% ваших клиентов зайдут с телефона. Мы не просто «сжимаем» сайт, мы проектируем удобный интерфейс специально для пальцев и маленьких экранов.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
    )
  },
  {
    id: "04",
    title: "Надежность",
    value: "24/7",
    desc: "Никаких вирусов, как на WordPress. Никаких «падений» от наплыва клиентов. Мы строим монолитные системы, которые работают годами без поддержки.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    )
  }
];

export default function TechStack() {
  return (
    <section className="relative w-full py-24 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Заголовок */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
            Технологии = <span className="text-purple-500">Деньги</span>
          </h2>
          <p className="font-mono text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Мы не используем конструкторы. Мы пишем чистый код. 
            Для вас это означает: сайт загружается мгновенно, нравится Google и приносит заявки, а не головную боль.
          </p>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-[#111] border border-white/10 p-8 hover:border-purple-500/50 transition-colors duration-300 rounded-xl overflow-hidden"
            >
              
              {/* Фоновый градиент при ховере */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                
                {/* Верхняя часть: Иконка и Значение */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-lg text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs text-gray-600 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                    SYS_CHK: {item.value}
                  </span>
                </div>

                {/* Нижняя часть: Текст */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-mono">
                    {item.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}