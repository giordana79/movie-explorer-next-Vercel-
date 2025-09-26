// Adapter API TVMaze
const API_URL = "https://api.tvmaze.com";

// 🔍 Ricerca per titolo
export async function searchTitles(query) {
  if (!query.trim()) return [];
  const res = await fetch(`${API_URL}/search/shows?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Errore nella ricerca");
  const data = await res.json();
  return data.map((d) => normalizeSearchItem(d.show));
}

// 📄 Dettaglio per id
export async function getTitleById(id) {
  const res = await fetch(`${API_URL}/shows/${id}`);
  if (!res.ok) throw new Error("Errore nel dettaglio");
  const show = await res.json();
  return normalizeDetailItem(show);
}

// Normalizza risultato ricerca
function normalizeSearchItem(show) {
  return {
    id: show.id,
    title: show.name,
    year: show.premiered ? show.premiered.slice(0, 4) : "—",
    poster: show.image?.medium || show.image?.original || null,
    rating: show.rating?.average ?? null,
  };
}

// Normalizza dettaglio
function normalizeDetailItem(show) {
  return {
    id: show.id,
    title: show.name,
    year: show.premiered ? show.premiered.slice(0, 4) : "—",
    genres: show.genres || [],
    summaryHTML: show.summary || "",
    poster: show.image?.original || show.image?.medium || null,
    rating: show.rating?.average ?? null,
    status: show.status,
    language: show.language,
    runtime: show.runtime,
    premiered: show.premiered,
    officialSite: show.officialSite || show.url,
  };
}

