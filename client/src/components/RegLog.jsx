import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const RegLog = () => {
  return (
    <div>
          <div>
            <h1>Secret Recipes of the Yaya Sisterhood</h1>
          </div>
        <div className='d-flex justify-content-around'>


            <RegisterForm/>
            <LoginForm/>
        </div>

    </div>
  )
}

export default RegLog