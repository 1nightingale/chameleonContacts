
# Chameleon Contacts Frontend

This is the frontend for Chameleon Contacts, built with Next.js (App Router), React, and Material UI. It provides a professional, responsive UI for managing contacts, supporting dark/light mode and a modern look.

## Features
- Material UI with custom theming
- Responsive two-column layout (contacts list and details)
- Add, edit, and delete contacts
- Sort contacts by first or last name
- Chameleon logo and favicon

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Environment Variables
Create a `.env.local` file in the `frontend/` directory if you need to override the default API URL. Example:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Install Dependencies
```sh
npm install
```

### Start the Frontend
```sh
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000) by default.

## Notes
- The backend API must be running and accessible at the URL specified in `NEXT_PUBLIC_API_URL`.
- For development, ensure CORS is configured if backend and frontend run on different ports.
