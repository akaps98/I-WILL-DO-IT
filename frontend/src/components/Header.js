import React from 'react';
import './Header.css';

const Header = () => {
    return (
      <header className="header">
        <h1 className="logo"><a href="#home">I WILL DO IT</a></h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;