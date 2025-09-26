import { useEffect, useState } from "react";

// Hook debounce: restituisce `value` solo dopo `delay` ms senza cambiamenti
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t); // se value cambia prima della scadenza, reset del timer
  }, [value, delay]);

  return debounced;
}

