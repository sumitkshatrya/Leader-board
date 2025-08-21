

# ranking-based app

A **fullstack application** to manage users, award points, track history, and display a leaderboard. Built with **React, Node.js, Express, and MongoDB**. Supports **auto-refresh**, real-time leaderboard updates, and history tracking.

---

## Features

- Add and select users
- Claim points for users
- View real-time leaderboard
- Track user points history
- Auto-refresh data every 5 seconds
- Fully responsive UI with Tailwind CSS

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Deployment-ready:** Supports Vercel / Render / Heroku

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/points-claim-app.git
cd points-claim-app

2. Backend Setup
cd backend
npm install


Create a .env file:

MONGO_URI=<your-mongodb-connection-string>
PORT=5000


Start the backend server:

npm run dev

3. Frontend Setup
cd ../frontend
npm install
npm run dev


Open your browser at http://localhost:5173 (or port shown in terminal).

API Endpoints
Users

GET /api/users - Get list of users

POST /api/users - Add a new user ({ name: string })

Points

POST /api/points/claim - Claim points for a user ({ userId: string })

History

GET /api/history - Get points history

Folder Structure
backend/
  ├─ controllers/
  ├─ models/
  ├─ routes/
  ├─ middleware/
  └─ server.js

frontend/
  ├─ src/
  │   ├─ components/
  │   ├─ services/
  │   └─ App.jsx
  └─ index.html

Notes

Points are awarded randomly between 1–10 per claim

History timestamps are automatically formatted in MM/DD/YYYY, hh:mm:ss AM/PM

Auto-refresh runs every 5 seconds to fetch updated users and history

Deployment

Backend: Vercel, Render, Heroku, or any Node.js hosting

Frontend: Vercel, Netlify, or any React hosting

Make sure to set MONGO_URI environment variable in production

License

MIT © Your Name


---

If you want, I can **also create a more detailed version** with **screenshots, live demo link, and usage instructions** so your project looks fully polished for GitHub.  

Do you want me to do that next?
"# Leader-board" 
