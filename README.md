# Wellness App 🌿

A wellness platform to create, manage, and publish sessions.  
Built using **MERN Stack** (MongoDB, Express, React, Node.js).

## 🚀 Features
- User authentication (JWT & Cookies)
- Create, edit, and publish sessions
- Draft auto-save feature
- Protected routes for logged-in users
- Responsive design
- Deployed backend & frontend in a single server

## 🛠 Tech Stack
- **Frontend**: React, Vite, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT with cookies
- **Styling**: Bootstrap / Custom CSS

## 📦 Installation
Clone the repository:
```bash
git clone https://github.com/your-username/wellness-app.git
cd wellness-app
```

Install dependencies for backend:
```bash
npm install
```

Install dependencies for frontend:
```bash
cd frontend
npm install
```

## ⚙ Environment Variables
Create a `.env` file in the backend folder with:
```
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

## ▶ Run in Development
Backend:
```bash
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## 📤 Build & Deploy
To build the frontend:
```bash
cd frontend
npm run build
```
The build will be served by Express from the `dist` folder.

---

## 🚀 Deployment (Render Example)
1. Push your code to GitHub.
2. Create a new Web Service in Render.
3. Connect your GitHub repo.
4. Add Environment Variables from `.env`.
5. Set build command:  
   ```
   cd frontend && npm install && npm run build && cd .. && npm install
   ```
6. Set start command:
   ```
   npm start
   ```


