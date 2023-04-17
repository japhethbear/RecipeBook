import React, { useEffect }from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const LandingPage = () => {



    return (
        <>
        <h1 className='mt-2'>Welcome, Back!</h1>
        <div className='d-flex justify-content-center align-items-center pl-5'>
            <p className='border-end border-primary border-2 pe-5 mx-5'><Link to={'/myrecipes'} >My Recipes</Link></p>
            <p className=''><Link to={'/recipe/new'} >Add Recipe</Link></p>
            <p className='border-start border-primary border-2 ps-5 mx-5'><Link to={'..'} >Shopping List</Link></p> 
        </div>
        <img src="/images/GRamsay.jpeg" alt="Gordon Ramsay" width="1050" height="625"/>
        </>

    )

} 

export default LandingPage;