# Chameleon Demo Backend

This backend exposes a single API endpoint to demonstrate the chameleon encryption technique to a non-technical audience. It returns raw contact data from the database, with the `checkSum` field truncated (ending in `...`). No decryption is performed and the encryption key is not required or known to this backend.

## Features
- Exposes `GET /contact/:id` to fetch a contact by ID
- Returns all fields as stored in the database
- The `checkSum` field is truncated for demonstration
- No decryption or sensitive key handling

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Access to the same PostgreSQL database as the main backend

### Environment Variables
Create a `.env` file in this directory with:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
```

### Install Dependencies
```sh
npm install
```

### Start the Server
```sh
npm run dev
```

The backend will run on [http://localhost:5000](http://localhost:5000) by default.

## Usage
- Make a GET request to `/contact/:id` (e.g., `http://localhost:5000/contact/clwxyz...`)
- The response will be the raw database record for that contact, with the `checkSum` field truncated.

---
This backend is for demonstration only and should not be used in production.
