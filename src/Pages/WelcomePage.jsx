import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/WelcomePage.css'

const WelcomePage = () => {
  return (
    <>
    <nav className="navbar_welcome">
    <div className="flex-container">
        <h1 className='header'>Currency Converter</h1>
        <h3 className='Signin'>Signin</h3>
    </div>
      </nav>
    <div className="welcome-page">
     <p>WELCOME TO CURRENCY CONVERTER</p>
      <Link to="/converter" className="start-button">
        Start Free Currency Converter....
      </Link>
    </div>
   
     </>
  );
};

export default WelcomePage;
