import React from 'react';
import About from '../About/About';
import kitchenBackground from '../../assets/images/kitchenbackground.jpg';

import '../About/aboutstyles.css'
import './homepagestyles.css'
import { Link } from 'react-router-dom'
import cookbook from '../../assets/images/cookbook.png'

const HomePage = () => {
  return (
    <div className="auth-background-container" style={{ backgroundImage: `url(${kitchenBackground})` }}>
      <div className="auth-navbar">
        <div className="container">
          <div className="auth-navbar-brand">
            <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }} />
            <h3>Recipe Book</h3>
          </div>
          <div className="auth-navbar-links">
            <Link to="/appdemo" className="auth-navbar-link">Demo</Link>
            <Link to="../registerandlogin" className="auth-navbar-link">Log In</Link>
          </div>
        </div>
      </div>
      <div className="auth-content">
        <div id="about" className="section">
          <About />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
