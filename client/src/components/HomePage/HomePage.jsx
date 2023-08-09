import React from 'react';
import { Link } from 'react-router-dom';
import About from '../About/About';
import kitchenBackground from '../../assets/images/kitchenbackground.jpg';
import Navbar from '../Navbar/Navbar';
import Layout from '../Layout/Layout';

import '../About/aboutstyles.css'
import './homepagestyles.css';
import '../HowToCook/howtostyles.css'
import '../AppDemo/appdemostyles.css'

const HomePage = () => {
  return (
    <Layout>
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
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
