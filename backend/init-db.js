require('dotenv').config();
const mysql = require('mysql2/promise');

async function initDB() {
    try {
        console.log("Connecting to MySQL to initialize DB...");
        // Connect without database first
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            ssl: {
                rejectUnauthorized: false
            }
        });

        console.log("Creating database ecommerce_db if not exists...");
        await connection.query('CREATE DATABASE IF NOT EXISTS ecommerce_db');
        await connection.query(`USE ${process.env.DB_NAME || 'ecommerce_db'}`);

        console.log("Creating users table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('customer', 'admin') DEFAULT 'customer',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Creating orders table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                total_amount DECIMAL(10, 2) NOT NULL,
                status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log("Creating order_items table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                product_title VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                quantity INT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            )
        `);

        console.log("Database & Relational Tables perfectly initialized!");
        await connection.end();
    } catch (err) {
        console.error("Failed to initialize database:", err.message);
        console.error("Please make sure MySQL is running on your machine and you have root access without password (or update .env).");
    }
}

initDB();
