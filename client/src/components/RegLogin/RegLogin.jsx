import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import './regloginstyles.css';
import cookbook from '../../assets/images/cookbook.png';
import kitchenBackground from '../../assets/images/kitchenbackground.jpg';

const RegLogin = () => {
  return (
    <div className="auth-background-container">
      <div className="auth-navbar">
        <div className="container">
          <div className="auth-navbar-brand">
            <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }} />
            <h3>Recipe Book</h3>
          </div>
          <div className="auth-navbar-links">
            <Link to="/" className="auth-navbar-link">Home</Link>
          </div>
        </div>
      </div>
      <div className="auth-content">
        <div className="auth-form-container with-background">
          <LoginForm />
        </div>
        <div className="auth-form-container with-background">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegLogin;
