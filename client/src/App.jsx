import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { useState } from "react";
import BookDetails from "./pages/BookDetails";

function App() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  return (
    <Router>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}  />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} selectedGenre={selectedGenre} />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/book/:id" element={<BookDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
