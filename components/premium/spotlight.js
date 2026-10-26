// Обработчик для карточек с классом .spotlight (см. app/globals.css):
// передаёт координаты курсора внутри карточки в CSS-переменные --mx/--my.
// Пишем прямо в style, без setState, — иначе перерисовка на каждый пиксель.
export function onSpotlightMove(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--my', `${e.clientY - rect.top}px`);
}
