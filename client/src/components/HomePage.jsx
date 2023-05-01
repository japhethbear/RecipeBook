import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const HomePage = () => {
  return (
    <div>
          <div>
            <h1>Recipe Book</h1>
          </div>
        <div className='d-flex justify-content-around'>


            <RegisterForm/>
            <LoginForm/>
        </div>

    </div>
  )
}

export default HomePage