import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import kitchenBackground from '../assets/images/kitchenbackground.jpg';
import cookbook from '../assets/images/cookbook.png';

import './styles.css';

const HomePage = () => {
  return (
    <div className="container-fluid px-0" style={{ background: 'var(--papaya-whip)', minHeight: '100vh' }}>
      <div className="background-wrapper">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${kitchenBackground}`,
          }}
        ></div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'none' }}>
          <div className="container">
            <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }}/>
            <h3 className="navbar-brand" style={{ marginRight: 'auto', fontSize: '20px', color: 'black' }}>
              Recipe Book
            </h3>
            <ul className="navbar-nav ml-auto" style={{ display: 'flex', alignItems: 'center' }}>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ fontSize: '20px', color: 'black' }}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ fontSize: '20px', color: 'black' }}>
                  Example
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ fontSize: '20px', color: 'black' }}>
                  How to Cook
                </Link>
              </li>
            </ul>
            <Link
              className="nav-link"
              to="/"
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
    </div>
  );
};

export default HomePage;