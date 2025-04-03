// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Spatial-Do</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/spaces">Spaces</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
