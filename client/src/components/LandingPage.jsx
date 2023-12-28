import React, { useEffect, useState }from 'react';
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom';
import gordonRamseyHelp from '../assets/images/gramsey.gif';
import cookbook from '../assets/images/cookbook.png'

import '../components/HomePage/newhomepagestyles.css'

const LandingPage = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                setUser(res.data.user)}
                )
            .catch(err => console.log(err));
    }, []);
    
    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/')})
            .catch(err => console.log(err));
    }

    const logoutButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
    };


    return (
        <>
        <div className="background-container">
            <div className="navbar">
                <div className="navbar-brand">
                    <img src={cookbook} alt="Cook Book" style={{ width: '40px', height: 'auto' }} />
                    <h3>Recipe Book</h3>
                </div>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link" onClick={logout}>Logout</Link>
                </div>
            </div>
            <div className="landing-content">
                <h1 className="landing-heading">Time to cook, {user.firstName}!</h1>
                <div className="link-container">
                    <p className="link-item border-end"><Link to={`/myrecipes/${id}`} className="nav-link">My Recipes</Link></p>
                    <p className="link-item"><Link to={`/recipe/new/${id}`} className="nav-link">Add Recipe</Link></p>
                    <p className="link-item border-start"><Link to={`/trimrecipe/${id}`} className="nav-link">Trim Recipe</Link></p>
                </div>
                <img 
                    src={gordonRamseyHelp} // Set the src attribute to the image path
                    alt="Gordon Ramsey Help GIF" // Add an alt attribute for accessibility
                    style={{ width: '100%', maxWidth: '400px', margin: '20px auto' }} // Adjust the styles as needed
                />
            </div>
        </div>
        </>

    )

} 

export default LandingPage;