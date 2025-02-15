const express = require("express");
const { getBooks, addBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/books", getBooks);
router.post("/books", addBook);

module.exports = router;
