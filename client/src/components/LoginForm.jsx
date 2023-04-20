import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm = () => {
    
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState([]);

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', userInfo, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/home')
            })
            .catch(err => {
                const errorResponse = err.response.data.message;
                console.log(err)

                setErrors([errorResponse]);
            })
        };



  return (
    <div className='col-md-4 mt-4'>
        <form onSubmit={submitHandler}>
            <h3 className='text-center'>Login</h3>
            {errors.map((err, index) => <p key={index}>{err}</p>)}            <div className='form-group'>
                <label className="form-label">Email</label>
                <input type="text" className='form-control' name='email' value={userInfo.email} onChange={changeHandler}/>
            </div>
            <div className='form-group'>
                <label className="form-label">Password</label>
                <input type="text" className='form-control' name='password' value={userInfo.password} onChange={changeHandler}/>
            </div>
            <div className='form-group'>
                <button type='submit' className='btn btn-primary mt-3'>Login</button>
            </div>
        </form>
    </div>

  )
}

export default LoginForm