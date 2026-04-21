const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create order
router.post('/checkout', async (req, res) => {
    try {
        const { userId, totalAmount, items } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: 'User is not logged in. Cannot checkout.' });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty.' });
        }

        // 1. Create order
        const [orderResult] = await db.query(
            'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
            [userId, totalAmount, 'paid'] // simulate it being paid right away
        );
        const orderId = orderResult.insertId;

        // 2. Insert order items
        const orderItemsQuery = 'INSERT INTO order_items (order_id, product_id, product_title, price, quantity) VALUES ?';
        
        const orderItemsValues = items.map(item => [
            orderId,
            item.id,
            item.title,
            item.price,
            item.quantity
        ]);

        await db.query(orderItemsQuery, [orderItemsValues]);

        res.status(201).json({ message: 'Order placed successfully!', orderId });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: 'Internal server error while placing order' });
    }
});

// Fetch orders per user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        
        // Let's also fetch items for these orders
        for (let order of orders) {
            const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
            order.items = items;
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
