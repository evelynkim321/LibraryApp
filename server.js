require('dotenv').config()

const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes'); 
const bodyParser = require('body-parser');


const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Authentication Route
app.use('/api/auth', authRoutes); 

// Book Routes
app.use('/api', bookRoutes); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
