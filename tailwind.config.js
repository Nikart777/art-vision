/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00b9d1",
        "background-light": "#f5f7fa",
        "background-dark": "#181c20",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // var(--font-space-mono) и var(--font-mono-cyr) задаются next/font
        // в app/layout.js: латиница — Space Mono, кириллица — JetBrains Mono.
        // Строковый "Space Mono" оставлен запасным вариантом.
        "display": ["var(--font-space-mono)", "var(--font-mono-cyr)", "Space Mono", "monospace"],
        "sans": ["var(--font-space-mono)", "var(--font-mono-cyr)", "Space Mono", "monospace"],
        "serif": ["var(--font-space-mono)", "var(--font-mono-cyr)", "Space Mono", "monospace"],
        "mono": ["var(--font-space-mono)", "var(--font-mono-cyr)", "Space Mono", "monospace"],
        // Акцентный курсив для отдельных слов в заголовках главной
        "accent": ["var(--font-accent)", "Georgia", "serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
};
