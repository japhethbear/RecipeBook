import React from 'react';
import { Link } from 'react-router-dom';
import cookbook from '../../assets/images/cookbook.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'none' }}>
      <div className="container">
        <img src={cookbook} alt="Cook Book Picture" style={{ width: '40px', height: 'auto' }} />
        <h3 className="navbar-brand" style={{ marginRight: 'auto', fontSize: '20px', color: 'black' }}>
          Recipe Book
        </h3>
        <ul className="navbar-nav ml-auto" style={{ display: 'flex', alignItems: 'center' }}>
          <li className="nav-item">
            <Link
                className="nav-link"
                to="/appdemo"
                style={{ fontSize: '20px', color: 'black' }}
              >
                Demo
            </Link>
          </li>
        </ul>
        <Link
          className="nav-link"
          to="../registerandlogin"
          style={{ marginLeft: 'auto', fontSize: '20px', color: 'black' }}
        >
          Log in
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
