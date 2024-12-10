import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
      <header className="header">
        <h1 className="title"><Link to='/'>I WILL DO IT</Link></h1>
        <FontAwesomeIcon icon={faBook} size="3x"/>
        <nav>
          <ul className="nav-links">
            <li><Link to='/'>Register</Link></li>
            <li><Link to='logIn'>Log In</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;