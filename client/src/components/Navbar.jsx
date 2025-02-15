import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar flex items-center bg-amber-300">
            <div className="navbar-logo p-2">
                <Link to="/">NovelNest</Link>
            </div>
            <ul className="navbar-links flex p-2 ">
                <li className='p-2'>
                    <Link to="/">Home</Link>
                </li>
                <li className='p-2'>
                    <Link to="/favorites">Favorites</Link>
                </li>
                <li className='p-2'>
                    <Link to="/profile">Profile</Link>
                </li>
                <li className='p-2'>
                    <Link to="/Auth">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;