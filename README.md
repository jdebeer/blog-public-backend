# blog-public-backend
Connect to and interact with concepts from my blog

## running the app locally
1. Open up the root directory of this directory in the terminal
2. Run `npm run compose-dev`
3. Wait for environment to spin up...
4. Run db migrations: `docker exec api npm run migrate`
5. Run db seeders: `docker exec api npm run seed`

## basic design
- Node application on the backend (/app)
    - Express Server
    - REST API (no GraphQL, for now)
    - Sequelize ORM
- PostgreSQL database (/db)
- Plain JavaScript (no TypeScript, for now)
