const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    // In a real app, you'd verify JWT token here
    // For now, we'll assume user is passed in req.user from auth middleware
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

// Get all tables data
router.get('/tables', requireAdmin, async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, name, email, role, created_at FROM users');
        const [orders] = await db.query('SELECT * FROM orders');
        const [orderItems] = await db.query('SELECT * FROM order_items');

        res.json({
            users,
            orders,
            orderItems
        });
    } catch (error) {
        console.error('Admin tables error:', error);
        res.status(500).json({ error: 'Failed to fetch admin data' });
    }
});

module.exports = router;