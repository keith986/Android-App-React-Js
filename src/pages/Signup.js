import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as icon from 'react-bootstrap-icons'
import { db, auth } from '../firebase'
import {serverTimestamp, setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../context/UserContext';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Signup = () => {
  
  const {user} = useContext(UserContext)

  const navigate = useNavigate()

  if(user){
  if(user.role === 'customer'){
    navigate('/dashboard')
  }else if(user.role === 'admin'){
    navigate('/admin')
  }
  }

  const [isCreate, setIsCreate] = useState({
        username : '',
        email : '',
        password : '',
        confirmpswd : ''
  })

  const [phone, setPhone] = useState([])
  const handlePhoneChange = (e) => {
     setPhone('+' + e)
  }

  const handleChange = (e) => {
    setIsCreate({...isCreate , [e.target.name] : [e.target.value]})
  }

  //Google Sign Up
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({   
    prompt : "select_account"
  }); 
  const handleGoogleSignUp = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {

      const user_prof = result.user;
      setDoc(doc(db, "customers", user_prof.uid), {
            userid: user_prof.uid,
            username: user_prof.displayName,
            email: user_prof.email,
            contrycode: '',
            phonenumber: '',
            role: 'customer',
            createdAt : serverTimestamp()
            })
            .then((res) => {
              updateProfile(user_prof, {
                displayName: 'customer'
                       }) 
                       .then(() => {
                           toast.success('Successfully signed up.');
                           setTimeout(() => {
                               navigate('/login')
                           }, 5000)
                        })
                       .catch((errs) => {
                           toast.error('Server response error!')
                       })   
            })
            .catch((errs) => {
              toast.error('Internal Server!')
            })
     
     })
    .catch((error) => {
      // Handle Errors here.
      toast.error(error.message)
      // The email of the user's account used.
      const emails = error.customData.email;
      console.log('Email error :' + emails)
      // The AuthCredential type that was used.
      const credentialss = GoogleAuthProvider.credentialFromError(error);
      console.log(credentialss)
      // ...
     });
  }
  
  //Other Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isCreate.password.toString() === isCreate.confirmpswd.toString()){
        if(isCreate.password.toString().length >= 6 ){
        if(isCreate.username.toString() !== ''){
            if(isCreate.email.toString() !== ''){
                    if(phone.toString() !== ''){         
                createUserWithEmailAndPassword(auth, isCreate.email.toString(), isCreate.password.toString())
                          .then((userCredential) => {
                          const user = userCredential.user;
                          setDoc(doc(db, "customers", user.uid), {
                              userid: user.uid,
                              username: isCreate.username.toString(),
                              email: user.email,
                              phonenumber: phone.toString(),
                              role: 'customer',
                              createdAt : serverTimestamp()
                                })
                               .then((docRef) => {
                                updateProfile(user, {
                                  displayName: 'customer'
                                          }) 
                                         .then(() => {
                                           toast.success('Successfully signed up.');
                                           setTimeout(() => {
                                            navigate('/login')
                                           }, 5000)
                                          })
                                         .catch((errs) => {
                                             toast.error('Server response error!')
                                          }) 
                                })
                               .catch((ers) => {
                                toast.error('Internal server error!')
                                })
                             
                           })
                          .catch((error) => {
                            toast.error('Internal server error!')
                           });
                    }else{
                        toast.info('Phone number is required!')
                    }
            }else{
                toast.info('Email address is required!')
            }
        }else{
          toast.info('Username is required!')  
        }
        }else{
            toast.error('Password must be greater than 6 digits');
        }
    }else{
     toast.warning('Password does not match!')
    }
  }

  return (
    <div className='container-fluid'>
    <div className='log-row'>
    <div className='log-frst'>
    <icon.Cart3 className='login-icn'/>
    <h1>NEW ACCOUNT</h1>
    </div>
   <form onSubmit={handleSubmit}>
     <div className='log-in'>
         <icon.Cart3 className='login-icn'/>
         <h1>NEW ACCOUNT!</h1>
         <button type='button' className='sigb-btn' id='sgn-google' onClick={handleGoogleSignUp}>Sign up with Google</button>
         <div className='log-div'>
         <input type='text' className='username' placeholder='create a username' name='username' required  onChange={handleChange} />
           <input type='email' className='email' placeholder='enter your email address' name='email' required  onChange={handleChange} />
           <PhoneInput country={'ke'} name='phone' onChange={handlePhoneChange} />
           <input type='password' className='password' placeholder='create your password' name='password' required  onChange={handleChange} />
           <input type='password' className='password' placeholder='confirm your password' name='confirmpswd' required  onChange={handleChange} />
           <Link to='/login' id='sign-up'>Already have an account</Link>
           <button type='submit' className='submit'>Sign up</button>
         </div>
     </div>
   </form>
    </div>
    </div>
  )
}

export default Signup
