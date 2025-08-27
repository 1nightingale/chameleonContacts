# Chameleon Contacts

Chameleon Contacts is a secure, modern web application for managing contacts, featuring a unique "chameleon" encryption pattern for personally identifiable information (PII). The solution consists of a Next.js/Material UI frontend and a Node.js/Express/Prisma backend with PostgreSQL.

## Why Chameleon Contacts?

Most contact apps just encrypt your data and call it a day. Chameleon Contacts goes further: it uses a decoy data model inspired by [Decoy Data](https://techntrek.co.uk/article/decoy-data) to keep your real info safe—even if the database is breached. Here’s the trick: the fields you’d expect to hold names, emails, and addresses are filled with convincing fakes. The genuine, sensitive details are encrypted and stashed away in a special column, only accessible with the right keys.

So, what does this mean for you? Attackers poking around the database get nothing but smoke and mirrors, while legitimate users and integrations see the real deal. Aggregate fields (like age group or region) remain usable for analysis without exposing identities. Security by sleight of hand: misdirection for the win.

Want the deep dive on why this matters, how it works, and the proof-of-concept? Read the full articles:
- [Decoy Data: The Problem and the Solution](https://techntrek.co.uk/article/decoy-data)
- [Decoy Data, Part 2: Working Example](https://techntrek.co.uk/article/decoy-data-part-2)

## Features
- Chameleon encryption: PII is encrypted and only accessible with the correct key, while fake data is shown in public fields.
- Professional, responsive UI with Material UI and dark/light mode.
- RESTful API for CRUD operations on contacts.
- PostgreSQL database with Prisma ORM.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database

### Setup
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd chameleonContacts
   ```
2. **Configure environment variables:**
   - See `backend/README.md` and `frontend/README.md` for details.
3. **Install dependencies:**
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. **Run the backend:**
   ```sh
   cd backend
   npm run dev
   ```
5. **Run the frontend:**
   ```sh
   cd ../frontend
   npm run dev
   ```
6. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure
- `backend/` — Node.js/Express API, Prisma, encryption logic
- `frontend/` — Next.js app, Material UI, React

## Notes
- Ensure your PostgreSQL instance is running and accessible.
- The backend must be running for the frontend to fetch and update contacts.
- For development, you may need to set CORS or proxy settings if accessing from different ports.

---
See the `backend/README.md` and `frontend/README.md` for more detailed setup and environment variable instructions.
