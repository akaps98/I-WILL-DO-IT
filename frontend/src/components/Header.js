import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
    return (
      <header className="header">
        <FontAwesomeIcon icon={faBook} size="3x"/>
        <h1 className="title"><a href="#home">I WILL DO IT</a></h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#register">Register</a></li>
            <li><a href="#login">Log In</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;