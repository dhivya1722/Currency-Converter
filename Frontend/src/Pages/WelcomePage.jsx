import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/WelcomePage.css'
import About from '../Components/About';


const WelcomePage = () => {
  return (
    <>
      <nav className="navbar_welcome">
        <div className="flex-container">
          <h1 className='header'>Currency Converter</h1>
          <Link to="/signin">
            <h3 className='Signin'>Signin</h3>
          </Link>

        </div>
      </nav>
      <div className="welcome-page">
        <p>WELCOME TO CURRENCY CONVERTER</p>
        <Link to="/converter" className="start-button">
          Start Free Currency Converter....
        </Link>
      </div>
      <About />
    </>
  );
};

export default WelcomePage;
