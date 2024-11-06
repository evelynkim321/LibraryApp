const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    // Retrieve the token from the Authorization header
    const token = req.header('Authorization');
  
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    // Split the Authorization header to extract the token after 'Bearer '
    const bearerToken = token.split(' ')[1];
  
    // Check if the token is in the correct format (Bearer <token>)
    if (!bearerToken) {
      return res.status(401).json({ message: 'Invalid token format' });
    }
  
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
      
      // Attach the decoded user data to the request object for use in later stages
      req.user = decoded;
      
      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      // Token verification failed, respond with an error
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
  
  module.exports = protect;
