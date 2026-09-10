# Portfolio's backend
This backend app is for my portfolio website's data layer. It's a part of a two-folder repo (frontend / backend).

## Tech stack
- NestJS
- GraphQL (code-first, Apollo Server)
- PostgreSQL
- Prisma
- Docker
- TypeScript

## Architecture
There are 4 main data domains: Skill, User, UserSkill, and Match.
- Skill – a skill is basically a certain technology used in web development. Each has a name: e.g. React, TypeScript. Each skill also marked in regard to its relation to me: whether I have it, whether I want to learn it, or whether I have no relation to it (undefined).
- User – a visitor that has interacted with the portfolio. A user object is created for whoever has checked any box in the app's tables or submitted a match check.
- UserSkill – an entity connecting Users and Skills, since they can exist in a many-to-many relationship. A user can check skills as "I have it" or "I want to learn it" – this will be reflected in a UserSkill object. Another thing that is reflected in it is whether you're looking for this skill in a developer (flipped to true if you've submitted a match check with this skill).
- Match – not a separate entity / schema per se, but a domain nontheless – it contains logic for matching that is used when you submit the match-check form.

## Prerequisites
- Node 26+
- Postgres running locally or via Docker

## Environment variables (.env)
- DATABASE_URL – Postgres connection string
- PORT – server port (defaults to 3000)
- FRONTEND_URL – allowed CORS origin (defaults to http://localhost:5173)

## Running locally (without Docker)
This local setup assumes you're on macOS and use Homebrew. If this doesn't apply to you, consider running with Docker (see next section for details).
1. Install dependencies: npm install
2. Set up Postgres
  - Install: brew install postgresql@16
  - Start it: brew services start postgresql@16
  - Create the DB: createdb portfolio_dev
3. Set .env (see the respective section)
4. Migrate Prisma: npx prisma migrate dev
5. Seed the DB: npx prisma db seed
6. Run: npm run start:dev

## Running with Docker
1. Build a container: docker compose up --build
2. Seed the container's DB: docker compose exec backend npx prisma db seed – if you choose to run it in Docker's GUI, just run "npx prisma db seed" in the backend container
Note that Docker uses a separate DB from the local setup (ports 5433 vs 5432).

## Database migration
- Create a new migration: prisma migrate dev --name ...
- Seeding: npx prisma db seed – it adds initial data to the DB (skills + spelling dictionary)
- Spelling dictionary: skill name variants used for matching: e.g. JS would match JavaScript
- ! Danger: seeding is destructive for the DB's data. If your DB contains some data other than the initial one, be aware that you'll lose it after seeding. To be precise, you'll lose all data for UserSkill, while Skill and SkillNameVariant will be reset to the initial data.

## GraphQL API
All requests go through a single endpoint: /graphql
With the server running, open http://localhost:3000/graphql in a browser for an interactive Apollo Sandbox with full schema autocompletion – you can paste any example from below to it:

### skills – query
Fetch skills, optionally filter them by the relation to me (HAVE / WANT_TO_LEARN).
\`\`\`graphql
query {
  skills(myRelation: HAVE) {
    id
    name
    myRelation
  }
}
\`\`\`

### userSkills – query
List a guest user's existing skill connections (used for restoring checkboxes on return visits)
\`\`\`graphql
query {
  userSkills(userId: "some-user-id-here") {
    id
    skillId
    knowledgeStatus
    lookingForDevsWithIt
  }
}
\`\`\`

### createGuestUser – mutation
Create a new anonymous guest user. Isn't used on its own: it's used inside connectUserSkill and submitMatch.
\`\`\`graphql
mutation {
  createGuestUser {
    id
    name
    registeredOn
  }
}
\`\`\`

### connectUserSkill – mutation
Connect a guest user to a skill. Omit userId in the input to auto-create a guest.
\`\`\`graphql
mutation {
  connectUserSkill(input: {
    skillId: "some-skill-id-here",
    knowledgeStatus: HAS
  }) {
    id
    userId
    skillId
    knowledgeStatus
    lookingForDevsWithIt
  }
}
\`\`\`

### submitMatch – mutation
Submit up to 5 skill names and see how that set matches my skillset.
\`\`\`graphql
mutation {
  submitMatch(input: {
    skillNames: ["typescript", "js", "fake skill"]
  }) {
    userId
    matchedSkills {
      id
      name
    }
    missingSkillNames
  }
}
\`\`\`


## npm scripts
- start:dev – run the server locally
- build – compile for production
- start:prod – run the compiled build
- lint - run oxlint

## Project structure
- src/skills, src/users, src/user-skills, src/match – semantic domains, each of which contains models, services, and resolvers for the specified domain. UserSkills and Match also have a DTO, since related mutations take multi-field input.
- src/prisma – Prisma-Nest setup
- prisma/schema.prisma – Prisma schemas for the domains