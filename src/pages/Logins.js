import React, { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

//Other Login
const handleSubmit = (e) => {
  e.preventDefault();
signInWithEmailAndPassword(auth, isCredentials.email.toString(), isCredentials.password.toString())
                          .then((userCredential) => {
                           const user = userCredential.user;
                           toast.success('successfully logged in.')
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
                            toast.error('wrong email or password!')
                           });
}

//Google Sign In
const provider = new GoogleAuthProvider();
provider.setCustomParameters({   
  prompt : "select_account"
}); 
const handleGoogleSignIn = async () => {
  await signInWithPopup(auth, provider)
        .then((result) => {
          const user_p = result.user;
                           toast.success('successfully logged in.')
                           if(user_p.displayName === 'customer'){
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
    toast.error(error.message)
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
        <button type='button' className='sigb-btn' id='sgn-google' onClick={handleGoogleSignIn}>Sign In with Google</button>
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

