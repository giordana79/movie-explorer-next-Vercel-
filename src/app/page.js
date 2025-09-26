"use client";
// Client component: può usare hook (useState/useEffect), localStorage, eventi e window/document

import { useEffect, useState } from "react";

import ResultCard from "./components/ResultCard";
import DetailModal from "./components/DetailModal";

import { searchTitles, getTitleById } from "./lib/tvmaze";
// Adapter TVMaze: incapsula le chiamate API e normalizza i dati

import useDebounce from "./hooks/useDebounce";
// Hook custom: restituisce un valore "stabilizzato" per evitare troppe chiamate API

export default function HomePage() {
  // Input ricerca
  const [query, setQuery] = useState("");

  // Debounce della query (400ms)
  const debouncedQuery = useDebounce(query, 400);

  // Risultati della ricerca
  const [results, setResults] = useState([]);

  // Stati UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Paginazione client-side
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // Dati del dettaglio selezionato
  const [selected, setSelected] = useState(null);

  // Preferiti (array di id salvati in localStorage)
  const [favorites, setFavorites] = useState([]);

  // Carica preferiti al mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("favorites");
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {
      console.warn("Errore localStorage:", e);
    }
  }, []);

  // Salva preferiti quando cambiano
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.warn("Errore salvataggio preferiti:", e);
    }
  }, [favorites]);

  // Esegui ricerca quando cambia la query debounced
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setError(null);
      setPage(1);
      return;
    }

    setLoading(true);
    setError(null);

    searchTitles(debouncedQuery)
      .then((items) => {
        setResults(items);
        setPage(1);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  // Paginazione client-side
  const start = (page - 1) * PAGE_SIZE;
  const pagedResults = results.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));

  // Aggiungi/rimuovi preferiti
  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Apri dettagli: fetch del dettaglio per id e apri la modale
  const openDetail = async (id) => {
    setLoading(true);
    try {
      const detail = await getTitleById(id);
      setSelected(detail);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <section className="container">
      {/* Barra ricerca */}
      <input
        className="search"
        placeholder="Cerca un titolo… (es. matrix)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Cerca titolo"
      />

      {/* Messaggi stato */}
      {loading && <p className="hint">Caricamento…</p>}
      {error && <p className="error">Errore: {error}</p>}
      {!loading && !error && debouncedQuery && results.length === 0 && (
        <p className="hint">Nessun risultato per “{debouncedQuery}”.</p>
      )}

      {/* Griglia risultati */}
      <div className="grid">
        {pagedResults.map((item) => (
          <ResultCard
            key={item.id}
            title={item.title}
            year={item.year}
            poster={item.poster}
            rating={item.rating}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onClick={() => openDetail(item.id)}
          />
        ))}
      </div>

      {/* Paginazione */}
      {results.length > PAGE_SIZE && (
        <div className="pagination" role="navigation" aria-label="Paginazione">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Pagina precedente"
            title="Pagina precedente"
          >
            ◀︎
          </button>

          <span>
            Pagina {page} di {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Pagina successiva"
            title="Pagina successiva"
          >
            ▶︎
          </button>
        </div>
      )}

      {/* Modale dettaglio */}
      {selected && (
        <DetailModal
          data={selected}
          onClose={() => setSelected(null)}
          onToggleFavorite={() => toggleFavorite(selected.id)}
          isFavorite={favorites.includes(selected.id)}
        />
      )}
    </section>
  );
}

