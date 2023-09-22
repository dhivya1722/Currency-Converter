import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/WelcomePage.css'

const WelcomePage = () => {
  return (
    <div className='=container'>
   
    <div className="welcome-page">
     <p>WELCOME TO CURRENCY CONVERTER</p>
      <Link to="/converter" className="start-button">
        Start Converting....
      </Link>
    </div>
   
     </div>
  );
};

export default WelcomePage;
