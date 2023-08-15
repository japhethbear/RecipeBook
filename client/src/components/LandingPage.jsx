import React, { useEffect, useState }from 'react';
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom';
import GRamsey from '../assets/images/GRamsay.jpeg';

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
        <h1 className='mt-2'>Time to cook, {user.firstName}!</h1>
        <button className='btn btn-danger' style={logoutButtonStyle} onClick={logout}>Logout</button>
        <div className='d-flex justify-content-center align-items-center pl-5'>
            <p className='border-end border-primary border-2 pe-5 mx-5'><Link to={`/myrecipes/${id}`} >My Recipes</Link></p>
            <p className=''><Link to={`/recipe/new/${id}`} >Add Recipe</Link></p>
            <p className='border-start border-primary border-2 ps-5 mx-5'><Link to={`/trimrecipe/${id}`} >Trim Recipe</Link></p>
        </div>
        <img src={GRamsey} alt="Gordon Ramsay" width="1050" height="625"/>
        </>

    )

} 

export default LandingPage;