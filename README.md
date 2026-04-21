# Kumazon - Modern E-Commerce Application

This is a full-stack e-commerce application analogous to Amazon or Flipkart, featuring a unified Node.js backend linked to a MySQL database, and a highly responsive and animated React frontend ("Kumazon").

## Tech Stack

- **Frontend**: React, Framer Motion (for animations), Vite, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Project Structure

- `/backend` - Contains the Express server, REST APIs, and database configurations.
- `/frontend` - Contains the React client application (To be configured).

## Backend Setup (Node.js & MySQL)

### Prerequisites

1. **Node.js** v16 or higher
2. **MySQL Server** installed and running on your local machine.

### Installation & Configuration

1. **Navigate to the Backend Directory:**

   ```bash
   cd backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Database Configuration:**
   - Review the `backend/schema.sql` file.
   - Execute this SQL script in your local MySQL instance to create the database (`ecommerce_db`) and necessary tables.
   - Open `backend/.env` and update the `DB_PASSWORD` to match your local MySQL root password (or whichever user you prefer to use).

4. **Run the Server:**
   - For continuous development with nodemon:
     ```bash
     npm run dev
     ```
   - Or simply:
     ```bash
     npm start
     ```
   - The server runs on `http://localhost:5000` by default.

---

## Frontend Setup (Kumazon React App)

### Installation & Configuration

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm run dev
   ```

   - The app will start on an accessible localhost port (usually `http://localhost:5173`).
