# Chameleon Contacts

Chameleon Contacts is a secure, modern web application for managing contacts, featuring a unique "chameleon" encryption pattern for personally identifiable information (PII). The solution consists of a Next.js/Material UI frontend and a Node.js/Express/Prisma backend with PostgreSQL.

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
