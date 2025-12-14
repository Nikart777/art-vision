'use client';

const sectors = [
  {
    id: 1,
    name: "Строительство и Ремонт",
    sub: "Окна / Потолки / Дома"
  },
  {
    id: 2,
    name: "Авто и Логистика",
    sub: "Эвакуаторы / СТО / Перевозки"
  },
  {
    id: 3,
    name: "Сфера Услуг",
    sub: "Клининг / Юристы / Мастера"
  },
  {
    id: 4,
    name: "Медицина и Красота",
    sub: "Стоматологии / Салоны / Клиники"
  },
  {
    id: 5,
    name: "Производство и B2B",
    sub: "Заводы / Оборудование / Опт"
  },
];

export default function Sectors() {
  return (
    <section className="relative w-full py-24 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter">
              От Стартапа<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-white">
                До Завода
              </span>
            </h2>
            <div className="h-[2px] w-20 bg-purple-500"></div>
            <p className="font-mono text-gray-300 text-sm leading-relaxed">
              Масштаб бизнеса не важен. Важна подача.
              Мы берем простые ниши — установку окон, автосервис или клининг — и упаковываем их так, что клиент видит в вас лидера рынка.
            </p>
            <p className="font-mono text-white text-sm leading-relaxed border-l-2 border-white/20 pl-4">
              &laquo;Даже если вы продаете кирпичи, ваш сайт должен выглядеть как бутик.&raquo;
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectors.map((sector) => (
              <div
                key={sector.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 shadow-[0_10px_40px_-25px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400/80">0{sector.id}</p>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                      {sector.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 text-right">
                    [{sector.sub}]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}