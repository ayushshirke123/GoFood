 # GoFood – MERN Stack Food Ordering App

GoFood is a full‑stack **MERN** (MongoDB, Express, React, Node.js) application for browsing food items, adding them to a cart, placing orders, and viewing order history.

This README explains **how to install and run** both the frontend and backend so anyone can get the project running quickly.

---

## 1. Project Structure

- `backend/` – Node.js + Express API, MongoDB connection, auth, orders, and food data routes  
- `src/` – React frontend (Create React App)
  - `src/components/` – reusable UI components (Navbar, Card, Carousel, Footer, etc.)
  - `src/screens/` – pages (Home, Login, Signup, Cart, MyOrder)
  - `src/Modal.js` – modal used for the cart

---

## 2. Prerequisites

Make sure you have these installed:

- **Node.js** (v16+ recommended) and **npm**
- **Git**
- A **MongoDB** database (local or MongoDB Atlas)

> ⚠️ The MongoDB connection string is currently configured in `backend/db.js`.  
> Replace it with **your own** MongoDB URI before running in production.

---

## 3. Cloning the Repository

```bash
git clone https://github.com/ayushshirke123/GoFood.git
cd GoFood
```

---

## 4. Install Dependencies

### 4.1. Install frontend dependencies (React)

From the project root:

```bash
npm install
```

### 4.2. Install backend dependencies (Node/Express)

```bash
cd backend
npm install
```

---

## 5. Running the App in Development

You need **two terminals**: one for the backend API and one for the React frontend.

### 5.1. Start the backend (port **5000**)

From the `backend` folder:

```bash
cd backend
npm start
```

This will:

- Start the Express server on `http://localhost:5000`
- Connect to MongoDB
- Load food items and categories into global variables

### 5.2. Start the frontend (port **3000**) 

In a **new terminal**, from the project root (`GoFood`):

```bash
npm start
```

This will:

- Start the React development server on `http://localhost:3000`
- Open the app automatically in your browser

The frontend calls the backend API at `http://localhost:5000`.

---

## 6. Useful npm Scripts

### Frontend (root folder)

- **`npm start`** – start React dev server (http://localhost:3000)
- **`npm run build`** – build optimized production bundle
- **`npm test`** – run tests

### Backend (`backend` folder)

- **`npm start`** – start the Express server with Node
- **`npm run dev`** *(if you add nodemon script)* – start the server with auto‑reload

---

## 7. Environment & Configuration

- **MongoDB URI** – edit `backend/db.js` and replace the hard‑coded connection string with your own.  
  For better security, you can later move this to an environment variable (e.g. `process.env.MONGODB_URI`).
- CORS is configured to allow requests from `http://localhost:3000` (the React app).

---

## 8. Login, Signup & Orders

- **Signup**: creates a new user in MongoDB with hashed password (bcryptjs)
- **Login**: returns a JWT token stored in `localStorage`
- **Cart**: uses React context to manage cart state and opens in a modal
- **Orders**: when you check out, order data is stored in MongoDB; `My Orders` shows previous orders

---

## 9. Troubleshooting

- **Port 3000 already in use**
  - Close any other React dev servers or apps using port 3000, then run `npm start` again.
- **Port 5000 already in use**
  - Stop any other Node/Express servers using port 5000, then run `npm start` in `backend` again.
- **MongoDB connection errors**
  - Check your connection string in `backend/db.js`
  - Make sure your MongoDB cluster is running and IP access rules allow your machine.

---

Happy coding and enjoy GoFood! 🍕🍔

