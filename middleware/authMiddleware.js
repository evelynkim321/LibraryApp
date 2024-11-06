const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 
    if (!token) return res.status(401).json({ message: 'Authorization denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protect;
