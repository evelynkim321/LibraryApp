const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const protect = require('../middleware/authMiddleware'); 

// CRUD routes for books
router.post('/books', protect, bookController.createBook); 
router.get('/books', bookController.getAllBooks);           
router.get('/books/:id', bookController.getBook);           
router.put('/books/:id', protect, bookController.updateBook); 
router.delete('/books/:id', protect, bookController.deleteBook); 

module.exports = router;
