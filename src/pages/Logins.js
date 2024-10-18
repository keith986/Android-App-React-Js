import React, { useState } from 'react'
import {auth} from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
import * as icon from 'react-bootstrap-icons'

const Logins = () => {

const [isCredentials, setIsCredientials] = useState({
  email : '',
  password: ''
})

  const handleChange = (e) => {
    setIsCredientials({...isCredentials, [e.target.name] : [e.target.value]})
  }


const handleSubmit = (e) => {
  console.log(isCredentials.email.toString())
  e.preventDefault();
signInWithEmailAndPassword(auth, isCredentials.email.toString(), isCredentials.password.toString())
 .then((userCredential) => {
    const user = userCredential.user;
    toast.success('successfully logged in.')
    console.log(user)
  })
 .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('ERROR_Code : ' + errorCode)
    console.log('ERROR_Message : ' + errorMessage)
    toast.error('wrong email or password!')
  });
}

  return (
   <div className='container-fluid'>
  <form onSubmit={handleSubmit}>
    <div className='log-in'>
        <icon.Cart3 className='login-icn'/>
        <h1>Welcome back!</h1>
        <div className='log-div'>
          <input type='email' className='email' placeholder='email address' name='email' required onChange={handleChange} />
          <input type='password' className='password' placeholder='password' name='password' required onChange={handleChange} />
          <Link id='forgot-pswd'>Forgot password ?</Link>
          <Link id='sign-up'>Create an account</Link>
          <button type='submit' className='submit'>Login</button>
        </div>
    </div>
  </form>
    </div>
  )
}

export default Logins

