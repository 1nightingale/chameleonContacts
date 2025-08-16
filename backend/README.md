# Chameleon Contacts Backend

This is the backend API for Chameleon Contacts. It is built with Node.js, Express, TypeScript, and Prisma ORM, and uses PostgreSQL for data storage. The backend implements a chameleon encryption pattern: PII is encrypted and stored in a checksum field, while fake data is stored in public fields for privacy.

## Features
- RESTful API for managing contacts
- AES-256 encryption for PII
- Prisma ORM for database access
- Error logging and robust update logic

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database

### Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
ENCRYPTION_KEY=<32-character-random-string>
```
- `DATABASE_URL`: Your PostgreSQL connection string.
- `ENCRYPTION_KEY`: A 32-character string for AES-256 encryption (keep this secret!).

### Install Dependencies
```sh
npm install
```

### Database Migration
```sh
npx prisma migrate dev --name init
```

### Start the Server
```sh
npm run dev
```

The backend will run on [http://localhost:4000](http://localhost:4000) by default.

## API Endpoints
- `GET /contacts` — List all contacts
- `POST /contacts` — Add a new contact
- `PUT /contacts/:id` — Update a contact
- `DELETE /contacts/:id` — Delete a contact

## Notes
- Ensure the ENCRYPTION_KEY is kept safe and never committed to version control.
- The backend must be running for the frontend to function.
