import React from 'react';
import About from '../About/About';

import '../About/aboutstyles.css'
import './newhomepagestyles.css'
import { Link } from 'react-router-dom'
import cookbook from '../../assets/images/cookbook.png'

const HomePage = () => {
  return (
    <div className="background-container">
      <div className='page-content'>
        <div className="navbar">
          <div className="navbar-brand">
            <img src={cookbook} alt="Cook Book" style={{ width: '40px', height: 'auto' }} />
            <h3>Recipe Book</h3>
          </div>
          <div className="navbar-links">
            <Link to="/appdemo" className="navbar-link">Demo</Link>
            <Link to="../registerandlogin" className="navbar-link">Log In</Link>
          </div>
        </div>
        <div className="component-content">
          <div id="about" className="section">
            <About />
          </div>
        </div> 
      </div>
    </div>
  );
};

export default HomePage;
