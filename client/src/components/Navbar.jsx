import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const genres = ["Fiction", "Non-Fiction", "Autobiography"];

const Navbar = ({searchTerm,setSearchTerm,selectedGenre,setSelectedGenre}) => {

    const isLoggedIn = !!localStorage.getItem("userToken");
    const navigate =useNavigate();
    const location = useLocation();
   

    if (location.pathname === "/auth") return null;

        // Function to handle search input
        const handleSearch = (e) => {
            if (!isLoggedIn) {
              alert("Please log in to search books.");
              navigate("/auth");
              return;
            }
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top

            setSearchTerm(e.target.value);
          };
        const handlelogout =() =>{
          localStorage.removeItem("userToken");
          navigate("/auth");
        }
          // Function to handle genre selection
          const handleGenreChange = (e) => {
            if (!isLoggedIn) {
              alert("Please log in to filter by genre.");
              navigate("/auth");
              return;
            }
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top

            setSelectedGenre(e.target.value);
          };


    return (
<>
{ /* Navbar */}
          < div className="fixed t-0 l-0 h-24 w-full flex justify-between items-center bg-amber-100 p-4 rounded-lg shadow-md">
            <Link to='/'>
              <h1 className="text-2xl font-bold">NovelNest</h1>
            </Link>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search by Title or Author..."
                className="border p-2 rounded"
                value={searchTerm}
                onChange={handleSearch}
              />
              <select className="border p-2 rounded" onChange={handleGenreChange}>
                <option value="">Genre</option>
                {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
                ))}
              </select>
            </div>  

            <div  className="flex justify-between items-center p-4 rounded-lg shadow-md gap-5">
              
            <span className="material-symbols-outlined big-icon" style={{ fontSize: "30px" }}>
              <Link to="/profile">person</Link>
            </span>

              <button
                className="px-4 py-2 bg-amber-700 rounded-lg text-white"
                onClick={handlelogout}
              >
                Logout
              </button>
            </div>
          </div>
          </>
    );
};

export default Navbar;