const items = [
  'Платформы и SaaS',
  'Онлайн-трансляции',
  'E-commerce',
  'GEO-сопровождение',
  'Корпоративные сайты',
  'Telegram-боты',
  'Мобильные приложения',
  'WebGL и 3D',
];

function Row({ hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          {/* Кегль задаёт внешний span: .accent-serif масштабирует шрифт
              в em относительно родителя */}
          <span
            className={
              i % 2
                ? 'text-[clamp(28px,4vw,54px)] px-8 md:px-12'
                : 'text-white/85 font-light uppercase tracking-[-0.02em] text-[clamp(24px,3.6vw,48px)] px-8 md:px-12'
            }
          >
            {i % 2 ? <span className="accent-serif">{item}</span> : item}
          </span>
          <span className="text-white/25 text-[clamp(14px,1.6vw,20px)]">✦</span>
        </li>
      ))}
    </ul>
  );
}

// Бегущая строка с направлениями студии. Второй ряд — копия для бесшовного
// цикла, он скрыт от скринридера, чтобы список не читался дважды.
export default function Marquee() {
  return (
    <section
      aria-label="Направления Art.Vision"
      className="marquee relative w-full overflow-hidden bg-black border-y border-white/10 py-8 md:py-10"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
