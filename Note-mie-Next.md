#### Stesso progetto movie-explorer (React) solo che qui si usa Next.js

- npx create-next-app@latest movie-explorer-next
- cd movie-explorer-next
- npm run dev

In Next.js 13+ con App router i componenti per default sono "Server Components".

Server-Components gira sul server e non può usare useState ed useEffect o gestire eventi.

Client-component giraa nel browser e può avere uno stato, effetti e gestire interazioni utente.

Inserire "use client" obbliga Next.js a trattarlo come componente client.

Se il componente ha una logica interattiva si usa la modalità client, mentre se mostra solo contenuto statico resta Server Component (per default).

#### La funzione getServerSideProps

E' una funzione speciale di Next.js che permette di eseguire codice sul server prima di renderizzare una pagina.
Serve principalmente a recuperare dati dinamici ogni volta che un utente richiede la pagina. Viene eseguita solo sul server, mai sul client.
Si attiva a ogni richiesta HTTP dell’utente.I dati che ritorna vengono passati al componente come props ed è utile quando i dati devono essere sempre aggiornati o dipendono da informazioni della richiesta (es. cookie, header, query string, sessione).

#### Differenza con altre funzioni simili

- getStaticProps viene eseguita build-time (SSG), i dati sono statici
- getServerSideProps viene eseguita a ogni richiesta (SSR), utile per dati aggiornati in tempo reale.
- API Routes → se si. richiede solo un endpoint API (non props).
- client fetch la. pagina. viene reindirizzata e poi i dati vengono caricati sul browser.

la getServerSideProps si. usa quando i dati cambiano ad ogni richiesta (es. meteo, prezzo di mercato, stato di login).
Pagine personalizzate per utente (es. dashboard con sessione).
SEO: i dati sono pronti già nell’HTML, quindi ottimizzato per i motori di ricerca.

---
