import React from 'react';
import { Link } from 'react-router-dom';
import cookbook from '../../assets/images/cookbook.png';
import kitchenBackground from '../../assets/images/kitchenbackground.jpg';
import './layoutstyles.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="background-image" style={{ backgroundImage: `url(${kitchenBackground})` }} />
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }}/>
            <h3>Recipe Book</h3>
          </div>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
          </div>
        </div>
      </div>
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
