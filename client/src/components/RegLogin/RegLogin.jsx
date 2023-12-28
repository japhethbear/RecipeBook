import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import '../../components/HomePage/newhomepagestyles.css'
import cookbook from '../../assets/images/cookbook.png';

const RegLogin = () => {
  return (
    <div className="background-container">
      <div className="navbar">
          <div className="navbar-brand">
            <img src={cookbook} alt="Cook Book" style={{ width: '40px', height: 'auto' }} />
            <h3>Recipe Book</h3>
          </div>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
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
