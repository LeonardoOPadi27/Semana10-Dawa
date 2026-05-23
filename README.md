This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy en Vercel

1. Sube este proyecto a GitHub.
2. En Vercel, importa el repositorio desde GitHub.
3. Vercel detecta Next.js automáticamente; no hace falta configurar el build manualmente.
4. El comando de build es `npm run build`.

### URLs para mostrarle al profesor

- `/` -> portada con acceso a las dos apps.
- `/pokemon` -> Pokédex.
- `/rickandmorty` -> Rick & Morty.

### Qué debe ver

La portada ya no redirige. Ahora muestra dos tarjetas para entrar a cada sección, así tu profesor puede abrir ambas URLs desde una sola entrada.

## APIs usadas en el proyecto

### Pokédex

- `GET https://pokeapi.co/api/v2/pokemon?limit=151`
- `GET https://pokeapi.co/api/v2/pokemon/{name}`
- Imágenes de sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/{id}.svg`

### Rick & Morty

- `GET https://rickandmortyapi.com/api/character`
- `GET https://rickandmortyapi.com/api/character/{id}`
- `GET https://rickandmortyapi.com/api/character/?name=rick`
- Filtros opcionales que usa la app: `name`, `status`, `gender`, `type`

## Variables de entorno

Este proyecto no necesita variables de entorno obligatorias para funcionar ahora mismo.

- Usa `.env.local` solo si luego agregas claves privadas o URLs propias.
- El archivo `.env.example` deja un ejemplo limpio para el equipo o para la entrega.
