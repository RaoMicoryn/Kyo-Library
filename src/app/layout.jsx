import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Book Collection Manager",
  description:
    "Every book you've read, borrowed, or want to brag about, kept on one shelf.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Applies the saved theme before first paint to avoid a dark -> light flash.
const themeScript = `try{if(localStorage.getItem("book-shelf-theme")==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Figtree:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
