<h2 align="center">Blogify app</h2>

## blogify app client Live Link

### https://blogify1.vercel.app/

## Run the client application locally

If you want to run the client locally on your computer, firstly clone this project, go to the right path and open to the terminal then run `npm install` and then run the command `npm run build` to convert the TypeScript code to JavaScript code. And start the client with `npm run dev` command.

# Blog System Server

This server involves creating a blog system using TypeScript and Express.js, with Prisma ORM for database interaction, specifically with a PostgreSQL database. Authentication is handled through JSON Web Tokens (JWT). The system is designed around three main models: User, Blog and UserProfile, each with specific fields such as ids, names, timestamps, and relationships to other models.

## Server Live Link

### https://blog-server-gamma-wine.vercel.app/

## Run the server application locally

- Clone this repository: `git clone <repository_url>`
- Install dependencies: `npm install`
- Set up the environment variables by creating a `.env` file.
- Run the database migrations: `npx prisma migrate dev`
- Start the server: `npm run dev`
