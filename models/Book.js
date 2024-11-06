const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    category: { type: String },
    publishedDate: { type: Date },
    status: { type: String, enum: ['Available', 'Checked Out'], default: 'Available' },
    location: { type: String },
});

module.exports = mongoose.model('Book', bookSchema);
