import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import About from './About/About';
import kitchenBackground from '../assets/images/kitchenbackground.jpg';
import cookbook from '../assets/images/cookbook.png';
import HowToCook from './HowtoCook';
import AppFunctionality from './AppFunctionality';
import BGCooking from '../assets/videos/BGCooking.mp4'

import './About/aboutstyles.css'
import './styles.css';

const HomePage = () => {
  return (
    <div className="container-fluid px-0" style={{ background: 'var(--papaya-whip)', minHeight: '100vh' }}>
      <div className="background-wrapper">
        <video className="background-video" autoPlay muted loop>
            <source src={BGCooking} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        {/* <div
          className="background-image"
          style={{
            backgroundImage: `url(${kitchenBackground})`,
          }}>
        </div> */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'none' }}>
          <div className="container">
            <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }}/>
            <h3 className="navbar-brand" style={{ marginRight: 'auto', fontSize: '20px', color: 'black' }}>
              Recipe Book
            </h3>
            <ul className="navbar-nav ml-auto" style={{ display: 'flex', alignItems: 'center' }}>
              <li className="nav-item">
                <a className="nav-link" href="#about" style={{ fontSize: '20px', color: 'black' }}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#example" style={{ fontSize: '20px', color: 'black' }}>
                  Example
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how-to-cook" style={{ fontSize: '20px', color: 'black' }}>
                  How to Cook
                </a>
              </li>
            </ul>
            <Link
              className="nav-link"
              to="/login"
              style={{ marginLeft: 'auto', fontSize: '20px', color: 'black' }}
            >
              Log in
            </Link>
          </div>
        </nav>
        <div className="container py-5">
          <div className="text-center mb-4">
            <h1>Welcome to Recipe Book</h1>
          </div>
          <div className="row justify-content-center">
            <div className="d-flex justify-content-evenly">
              <div className="form-container mx-3">
                <RegisterForm />
              </div>
              <div className="form-container mx-3">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="about" className="section">
            <About />
      </div>
      <div id="example" className="section">
        <AppFunctionality />
      </div>
      <div id="how-to-cook" className="section">
        <HowToCook />      
      </div>
    </div>
  );
};

export default HomePage;
