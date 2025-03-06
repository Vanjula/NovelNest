import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const moods = ["Happy", "Sad", "Inspiring", "Ambitious", "Thrilling", "Calm"];
const types = [
  "Literature & Fiction","Psychology","Fantasy","Science Fiction","Self-Help","Biography","Technology","Entrepreneurship","History","Philosophy","Poetry","Spirituality",
  "Finance","Education","Health & Wellness","Crime & Mystery","Thriller","Military Strategy","Politics","Science","Mathematics","Engineering","Artificial Intelligence",
  "Personal Development","Business","Leadership","Music","Cooking","Art","Travel","Sports"];

  
  const Home = ({searchTerm,selectedGenre}) => {
    const [books, setBooks] = useState([]);
    const [selectedMood, setSelectedMood] = useState("");
    const navigate = useNavigate();
  
    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem("userToken");
  
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/books")
        .then((res) => {
          console.log("Fetched books:", res.data); // Debugging log
          setBooks(res.data);
        })
        .catch((err) => console.error("Error fetching books:", err));
    }, []);
  
   const handlebook = (id) =>{
    console.log("Navigating to book ID:", id);
    if(!id || id==="undefined"){
      alert("Invalid Book id");
      return;
    }
      navigate(`/book/${id}`);
   }
  
    // Function to handle mood selection
    const handleMoodChange = (mood) => {
      if (!isLoggedIn) {
        alert("Please log in to filter by mood.");
        navigate("/auth");
        return;
      }
      setSelectedMood(mood === selectedMood ? "" : mood);
    };
  
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
      <div className="bg-amber-50 min-h-screen p-6 pt-24">

          {/* Mood Selection */}
        <div className="flex justify-center space-x-2 my-4">
          {moods.map((mood) => (
            <button
              key={mood}
              className={`px-4 py-2 rounded-full border-2 border-amber-200  cursor-pointer ${selectedMood === mood ? "bg-white" : "bg-orange-200"}`}
              onClick={() => handleMoodChange(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
  
        {/* Recommended Books */}
          <h2 className="text-xl font-semibold my-3">Recommended Books</h2>
          <div className="grid grid-cols-5 gap-4 ">
            {filteredBooks.slice(0, 10).map((book) => (
              <div key={book._id} className="p-5 pl-0 pr-0 rounded-lg flex flex-col items-center transition-transform hover:scale-105 ">
                <div>
            <img src={book.img} alt={book.title} className="w-40 h-64 object-cover shadow-2xl border border-gray-300 rounded-md" />
            <h3 className="font-semibold mt-2 text-center">{book.title}</h3>
            <p className="text-gray-600 text-center">by {book.author}</p>
                </div>
            <div className="flex justify-between gap-7 pt-4">
            <p className="text-blue-800 text-left cursor-pointer" onClick={() => handlebook(String(book._id))}>View more</p> 
            <span className="material-symbols-outlined cursor-pointer hover:text-red-500 ">favorite</span>
            {/* <span className="hover:❤️">🤍</span> */}
            </div>
            </div>
            ))}
          </div>
          
          {/* Trending Books by Type */}
        {types.map((t) => {
          const booksByType = books.filter((book) => book.type === t);
          if (booksByType.length > 2) {
            return (
              <div key={t} className="mt-8">
                <h2 className="text-xl font-semibold my-3 text-black">Trending {t}</h2>
                <div className="grid grid-cols-5 gap-4">
                  {booksByType.slice(0, 10).map((book) => (
                    <div key={book._id} className="p-3 flex flex-col items-center transition-transform hover:scale-105">
                      <div>
                        <img src={book.img} alt={book.title} className="w-40 h-64 object-cover shadow-2xl border border-gray-300 rounded-md" />
                        <h3 className="font-semibold mt-2 text-center">{book.title}</h3>
                        <p className="text-gray-600 text-center text-sm">by {book.author}</p>
                      </div>
                      <div className="flex justify-between gap-7 pt-4">
                      <p className="text-blue-800 text-left" onClick={()=> handlebook(String(book._id))}>View more</p> 
                      <span className="material-symbols-outlined cursor-pointer hover:text-red-500 ">favorite</span>
                      {/* <span className="hover:❤️">🤍</span> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };
  
  export default Home;
  