"use client";

import { useEffect, useRef } from "react";

export default function DetailModal({ data, onClose, onToggleFavorite, isFavorite }) {
  const overlayRef = useRef(null);

  // Gestione tasto ESC per chiudere la modale
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="overlay"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${data?.title ?? "Dettaglio"} – dettaglio`}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>
            {data.title} ({data.year})
          </h2>

          <div className="actions">
            <button
              className={"fav" + (isFavorite ? " active" : "")}
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            >
              ★
            </button>

            <button className="close" onClick={onClose} aria-label="Chiudi dettaglio">
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body">
          {data.poster ? (
            <img className="poster big" src={data.poster} alt={data.title} />
          ) : (
            <div>No img</div>
          )}

          <ul>
            {data.genres?.length > 0 && (
              <li>
                <b>Generi:</b> {data.genres.join(", ")}
              </li>
            )}
            {data.language && (
              <li>
                <b>Lingua:</b> {data.language}
              </li>
            )}
            {data.runtime && (
              <li>
                <b>Durata:</b> {data.runtime} min
              </li>
            )}
          </ul>

          {/* Attenzione: TVMaze fornisce HTML in summary */}
          {data.summaryHTML && <div dangerouslySetInnerHTML={{ __html: data.summaryHTML }} />}
        </div>
      </div>
    </div>
  );
}
