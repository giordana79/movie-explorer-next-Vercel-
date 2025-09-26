"use client";
// Card con poster, titolo, anno, rating e pulsante preferito

export default function ResultCard({
  title,
  year,
  poster,
  rating,
  isFavorite,
  onToggleFavorite,
  onClick,
}) {
  return (
    <article className="card">
      <button className="card-body" onClick={onClick} aria-label={`Apri dettaglio di ${title}`}>
        {poster ? (
          <img className="poster" src={poster} alt={title} />
        ) : (
          <div className="poster placeholder">Nessuna immagine</div>
        )}
        <div className="meta">
          <h3 className="title">{title}</h3>
          <p className="year">Anno: {year}</p>
          {rating != null && <p className="rating">Rating: {rating}</p>}
        </div>
      </button>

      <button
        className={"fav" + (isFavorite ? " active" : "")}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      >
        ★
      </button>
    </article>
  );
}
