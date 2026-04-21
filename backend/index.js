require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5051;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Basic Route
app.get('/', (req, res) => {
  res.send('E-commerce Backend Server is running!');
});

// API Routes
app.use('/api/auth', require('./routes/auth'));

// We will attach our other routers here later
app.use('/api/orders', require('./routes/orders'));
// app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
