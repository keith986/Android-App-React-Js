import React, { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, } from "firebase/auth";
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import * as icon from 'react-bootstrap-icons'

const Logins = () => {

const navigate = useNavigate()

const [isCredentials, setIsCredientials] = useState({
  email : '',
  password: ''
})

const handleChange = (e) => {
    setIsCredientials({...isCredentials, [e.target.name] : [e.target.value]})
}

const handleSubmit = (e) => {
  e.preventDefault();
signInWithEmailAndPassword(auth, isCredentials.email.toString(), isCredentials.password.toString())
                          .then((userCredential) => {
    const user = userCredential.user;
    toast.success('successfully logged in.')
    console.log(user)
    if(user.displayName === 'customer'){
      setTimeout(() => {
        navigate('/dashboard')
      }, 5000)
    }else{
      setTimeout(() => {
        navigate('/admin')
      }, 5000)
    }
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
   <div className='log-row'>
   <div className='log-frst'>
   <icon.Cart3 className='login-icn'/>
   <h1>Welcome back!</h1>
   </div>
  <form onSubmit={handleSubmit}>
    <div className='log-in'>
        <icon.Cart3 className='login-icn'/>
        <h1>Welcome back!</h1>
        <div className='log-div'>
          <input type='email' className='email' placeholder='email address' name='email' required onChange={handleChange} />
          <input type='password' className='password' placeholder='password' name='password' required onChange={handleChange} />
          <Link id='forgot-pswd'>Forgot password ?</Link>
          <Link to='/signup' id='sign-up'>Create an account</Link>
          <button type='submit' className='submit'>Login</button>
        </div>
    </div>
  </form>
   </div>
   </div>
  )
}

export default Logins

