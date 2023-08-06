import React from 'react';
import { Link } from 'react-router-dom';
import About from '../About/About';
import kitchenBackground from '../../assets/images/kitchenbackground.jpg';
import cookbook from '../../assets/images/cookbook.png';
import HowToCook from '../HowToCook/HowtoCook';
import Navbar from '../Navbar/Navbar'; // Import the Navbar component
import AppDemo from '../AppDemo/AppDemo'; // Import the appropriate component

import '../About/aboutstyles.css'
import './homepagestyles.css';
import '../HowToCook/howtostyles.css'
import '../AppDemo/appdemostyles.css'

const HomePage = () => {
  return (
    <div className="container-fluid px-0" style={{ background: 'var(--papaya-whip)', minHeight: '100vh' }}>
      <div className="background-wrapper">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${kitchenBackground})`,
          }}>
        </div>
        <div className='container py-5'>
          <Navbar />
        </div>
        <div id="about" className="section">
          <About />
        </div>
        {/* <div id="how-to-cook" className="section">
          <HowToCook />      
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
