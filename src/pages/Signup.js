import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as icon from 'react-bootstrap-icons'
import { db, auth } from '../firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify'
import bcrypt from 'bcryptjs';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
    
    const navigate = useNavigate();

    const salt = bcrypt.genSaltSync(10)

    const [isCreate, setIsCreate] = useState({
        username : '',
        email : '',
        ccode : '',
        phone : '',
        password : '',
        confirmpswd : ''
    })

    const handleChange = (e) => {
        setIsCreate({...isCreate , [e.target.name] : [e.target.value]})
    }
  
    const handleSubmit = async (e) => {
    e.preventDefault();
    const hashed_pswd = bcrypt.hashSync(isCreate.password.toString(), salt);
    if(isCreate.password.toString() === isCreate.confirmpswd.toString()){
        if(isCreate.password.toString().length >= 6 ){
        if(isCreate.username.toString() !== ''){
            if(isCreate.email.toString() !== ''){
                if(isCreate.ccode.toString() !== ''){
                    if(isCreate.phone.toString() !== ''){         
       await addDoc(collection(db, "customers"), {
            username: isCreate.username.toString(),
            email: isCreate.email.toString(),
            contrycode: isCreate.ccode.toString(),
            phonenumber: isCreate.phone.toString(),
            password: hashed_pswd,
            createdAt : serverTimestamp()
              })
             .then((docRef) => {
                createUserWithEmailAndPassword(auth, isCreate.email.toString(), isCreate.password.toString())
                          .then((userCredential) => {
                            const user = userCredential.user;
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
                          .catch((error) => {
                            toast.error('Internal server error!')
                           });
              })
             .catch((err) => {
                toast.error('An error occured!')
                console.log(err.message)
              })
                    }else{
                        toast.info('Phone number is required!')
                    }
                }else{
                    toast.info('Country code is required!')
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
         <div className='log-div'>
         <input type='text' className='username' placeholder='create a username' name='username' required  onChange={handleChange} />
           <input type='email' className='email' placeholder='enter your email address' name='email' required  onChange={handleChange} />
           <div id='phone_code'>
           <select name='ccode' id='contry_code' onChange={handleChange} required>
           <option></option>
            <option value='+254' id='ke'>+254</option>
           </select>
           <input type='number' className='phone' placeholder='07***' name='phone' required onChange={handleChange} />
           </div>
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
