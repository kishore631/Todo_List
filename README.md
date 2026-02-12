# Basic Todo Fullstack (Vite frontend + Express backend)

This archive contains a ready-to-run fullstack Todo app.
It includes:
- `client/` — React (Vite) frontend
- `server/` — Node + Express backend
- Optional MongoDB support (controlled via `.env`)

## Quick start (in-memory default)

1. Open two terminals.
2. Start backend (in-memory):
   ```bash
   cd server
   npm install
   # copy .env.example -> .env and make sure USE_DB=false (default)
   npm start
   ```
3. Start frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 in your browser.

## Enable MongoDB (optional)
1. Install MongoDB locally or use Atlas.
2. In `server/.env` set:
   ```env
   USE_DB=true
   MONGODB_URI=<your-mongodb-uri>
   ```
3. Then run the server (`npm start`).

Notes:
- When using MongoDB, IDs will be MongoDB ObjectIds (strings).
- The server auto-uses in-memory storage when USE_DB=false.
