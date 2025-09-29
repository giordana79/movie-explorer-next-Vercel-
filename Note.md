### Deployare un'app su Vercel

**Per i permessi:**

- chmod +x node_modules/.bin/next

- rm -rf node_modules
- rm package-lock.json
- npm install
- npm run dev

creare la versione “deployabile”:

- npm run build
- npm run start
  
Questo genera il codice ottimizzato pronto per il deploy.

git remote add origin https://github.com/giordana79/movie-explorer-next-Vercel-.git

**Preview URL pubblica:**
[link Vercel](https://movie-explorer-next-vercel.vercel.app/)


