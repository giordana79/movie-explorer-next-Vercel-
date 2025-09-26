// Layout di base dell'app Next.js (App Router)
// Questo definisce la struttura comune di ogni pagina

export const metadata = {
  title: "Movie/Series Explorer",
  description: "Esercizio Next.js - TVMaze API",
};

// In App Router non serve importare React qui
import "./globals.css"; // stili globali

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <header className="site-header">
          <h1 className="site-title">Movie/Series Explorer</h1>
          <p className="site-subtitle">Next.js + TVMaze</p>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <small>Corso Frontend · TVMaze · Next.js</small>
        </footer>
      </body>
    </html>
  );
}
