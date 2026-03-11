# 🩸 LifeLine — Location-Based Blood Donation Platform

A full-stack web application that uses **Geo-Location (LBS)** to connect blood donors with hospitals in real-time using the Haversine Formula to find donors within a configurable radius.

---

## 📁 Project Structure

```
blood-request/
├── client/                  # React + Vite frontend (Tailwind CSS)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Site navigation with mobile menu
│   │   │   └── ProtectedRoute.jsx  # Auth guard wrapper
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Login.jsx           # User login
│   │   │   ├── Register.jsx        # Donor registration with geolocation
│   │   │   ├── BloodRequest.jsx    # Emergency blood request form
│   │   │   ├── Events.jsx          # Donation events (CRUD for admins)
│   │   │   ├── About.jsx           # About page
│   │   │   └── Contact.jsx         # Contact page
│   │   ├── App.jsx                 # Route definitions
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles (Tailwind)
│   ├── .env                        # VITE_API_URL
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Express + MongoDB backend (MVC)
│   ├── controllers/                 # Business logic layer
│   │   ├── bloodRequestController.js  # findDonors, registerDonor
│   │   └── eventController.js         # getEvents, createEvent, updateEvent, deleteEvent
│   ├── routes/                      # Route declarations only
│   │   ├── bloodRequest.js            # POST /api/find-donors, POST /api/register
│   │   └── eventRoutes.js             # CRUD /api/events
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js                    # User schema
│   │   ├── Donor.js                   # Donor schema (with lat/lon)
│   │   └── Event.js                   # Event schema
│   ├── utils/
│   │   └── haversine.js               # Distance calculation utility
│   ├── index.js                    # Express app entry point
│   ├── .env                        # PORT, MONGO_URI
│   └── package.json
│
└── package.json             # Root-level convenience scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB Atlas cluster (or local MongoDB)

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Configure Environment Variables

**`server/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start the Development Servers

In separate terminals:
```bash
# Terminal 1 — Backend
npm run dev:server

# Terminal 2 — Frontend
npm run dev:client
```

The frontend will run at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## 🔐 Admin Access

Log in with the following credentials to access admin features (event management):
- **Email:** `admin@lifeline.com`
- **Password:** `adminpassword123`

---

## 🛠️ Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 19, Vite, Tailwind CSS v4         |
| Backend  | Node.js, Express 5                      |
| Database | MongoDB + Mongoose                      |
| Auth     | localStorage token (JWT-ready)          |
| Geo      | Browser Geolocation API + Haversine     |
