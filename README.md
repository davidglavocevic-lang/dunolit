# Dunolit

Premium web stranica za Dunolit, tvrtku specijaliziranu za obradu prirodnog
kamena i arhitektonska rjesenja po mjeri.

## Funkcionalnosti

- responzivna javna stranica na hrvatskom jeziku
- katalog materijala s filtriranjem i pretragom
- PDF izvoz kataloga
- galerija realiziranih projekata
- prikaz procesa rada
- kontakt obrazac za upite
- jezici HR, EN, DE, SV i DA
- administracija materijala, projekata, upita i postavki
- SEO i Open Graph metapodaci

## Admin

Administracija je dostupna na `/admin`.

- korisnik: `demo`
- lozinka: `demo123`

Demo podaci i promjene spremaju se lokalno u pregledniku. Podatkovni sloj je
predviđen za kasniju zamjenu Supabase bazom i autentikacijom.

## Tehnologije

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- jsPDF
- Lucide React

## Lokalni razvoj

```bash
npm install
npm run dev
```

Stranica je dostupna na `http://localhost:3000`.

## Provjera

```bash
npm run lint
npm run build
```
