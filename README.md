# Book Collection Manager

Next.js (App Router) · Tailwind CSS v4 · Ant Design · GSAP + ScrollTrigger · Lenis

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
src/
  app/
    layout.jsx        fonts, theme-flash script, <Providers>
    page.jsx          renders <BookShelf />
    globals.css       Tailwind + theme CSS variables (dark/light)
  components/
    Providers.jsx     AntdRegistry + ThemeProvider + Ant ConfigProvider + Lenis
    SmoothScroll.jsx  Lenis <-> GSAP ScrollTrigger bridge
    BookShelf.jsx     page state: search, filter, dialogs
    Header.jsx        GSAP intro timeline + parallax
    Toolbar.jsx       Ant Input / Select
    BookGrid.jsx      ScrollTrigger.batch card reveal
    BookCard.jsx      card + GSAP hover lift
    BookCover.jsx     cover image or generated gray cover
    BookFormModal.jsx Ant Modal + Form (add / edit, cover upload)
    BookViewModal.jsx
    DeleteModal.jsx
    ScrollProgress.jsx
    ThemeProvider.jsx
  hooks/              useBooks (localStorage), useIsoLayoutEffect
  lib/                books.js (seed, helpers), gsap.js (plugin setup)
public/images/        put seed cover images here (optional)
```

Books and theme are stored in localStorage, same keys as the original HTML.
