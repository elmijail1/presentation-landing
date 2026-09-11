# My Portfolio Website
## ℹ️ Description
This website describes me as a developer: it shows what skills I have and checks if they match with what you're looking for.
![My portfolio website](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnFiMjAxamo0Z2g4OGE1N3V6MGJxbTZ2M21jMDhob3N2ZTF4NjIzbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ihUJKRQ7FSOinMO336/giphy.gif)

## 🤷‍♂️ What's the point?
Give some info about me and showcase what I can do. Also, it was a test assignment I once received and its requirements seemed unusual and challenging enough for me to try building it.

## 🛠️ Tools used
- NestJS
- GraphQL (code-first, Apollo Server)
- PostgreSQL
- Prisma
- Docker
- TypeScript

Why on earth would anyone use NestJS, GraphQL, and a full-fledged database for a portfolio website? Those were the unusual and challenging requirements I've mentioned in the previous section 😏

## 🚀 Quick start
### View it live
Please be patient if it takes some time to load – it's on Render's free tier:

https://presentation-landing-1.onrender.com/

### Run it locally
Prerequisites
- Node 26+
- Postgres running locally or via Docker

#### Installing without Docker
This local setup assumes you're on macOS and use Homebrew. If this doesn't apply to you, consider running with Docker (see next section for details).

1. Install dependencies: `npm install`
2. Install Postgres: `brew install postgresql@16`
3. Start Postgres: `brew services start postgresql@16`
4. Create the DB: `createdb portfolio_dev`
5. Set .env: DATABASE_URL (Postgres connection string), PORT (defaults to 3000), and FRONTEND_URL (allowed CORS origin, defaults to `http://localhost:5173`)
6. Migrate Prisma: `npx prisma migrate dev`
7. Seed the DB: `npx prisma db seed`
8. Run: `npm run start:dev`

#### Installing with Docker
1. Build a container: `docker compose up --build`
2. Seed the container's DB: `docker compose exec backend npx prisma db seed` (if you choose to run it in Docker's GUI, just run `npx prisma db seed` in the backend container)

Note that Docker uses a separate DB from the local setup (ports 5433 vs 5432).
