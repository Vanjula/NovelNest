import React, { useState, useEffect } from "react";
import axios from "axios";

const genres = ["Fiction", "Non-Fiction", "Autobiography"];
const moods = ["Happy", "Sad", "Inspiring", "Ambitious", "Thrilling", "Calm"];


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      (selectedGenre ? book.genre === selectedGenre : true) &&
      (selectedMood ? book.mood === selectedMood : true) &&
      (searchTerm
        ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
  );

  return (
    <div className="bg-amber-100 min-h-screen p-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">NovelNest</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by Title or Author..."
            className="border p-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="border p-2 rounded" onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-2 my-4">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`px-4 py-2 rounded-full border ${selectedMood === mood ? "bg-white" : "bg-cyan-100"}`}
            onClick={() => setSelectedMood(mood === selectedMood ? "" : mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold my-3">Recommended Books</h2>
      <div className="grid grid-cols-5 gap-4">
        {filteredBooks.slice(0, 10).map((book) => (
          <div key={book._id} className="bg-amber-50 p-2 rounded-lg shadow-md flex flex-col items-center">
            <img src={book.img} alt={book.title} className="w-40 h-64 object-cover border border-gray-300 rounded-md" />
            <h3 className="font-semibold mt-2 text-center">{book.title}</h3>
            <p className="text-gray-600 text-center">by {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
