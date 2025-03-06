const Book = require("../models/Book");

// Fetch all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
};

module.exports = { getBooks, addBook };
