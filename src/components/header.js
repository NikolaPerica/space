import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import '../Header.css';

function Header() {
  return (
    <header className="header">
      
        <img
          src="/solar/pngtree-logo-space-image_321300-removebg-preview.png"
          alt="NASA Logo"
          className="nasa-logo"
        />
        <Link to="/" className="nav-link">
            <h1 className="nasa-name">Home</h1>
        </Link>
        <Link to="/neofeed" className="nav-link">
            <h1 className="nasa-name">Near Earth Object Feed</h1>
        </Link>
        <Link to="/nextlaunches" className="nav-link">
            <h1 className="nasa-name">Next launches</h1>
        </Link>
        <Link to="/photo" className="nav-link">
            <h1 className="nasa-name">Photo of the day</h1>
        </Link>
        <Link to="/planets" className="nav-link">
            <h1 className="nasa-name">Planets</h1>
        </Link>
        <Link to="/agencies" className="nav-link">
            <h1 className="nasa-name">Agencies</h1>
        </Link>
        <Link to="/stations" className="nav-link">
            <h1 className="nasa-name">Stations</h1>
        </Link>
        <Link to="/patches" className="nav-link">
            <h1 className="nasa-name">Mission patches</h1>
        </Link>
    </header>
  );
}

export default Header;
