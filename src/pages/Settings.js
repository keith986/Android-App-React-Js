import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'

const Settings = () => {
    const {user} = useContext(UserContext)
    const [userAddress, setUserAddress] = useState([])
    
    const navigate = useNavigate()
    
    const [isAddress, setIsAddress] = useState({
      city: '',
      location: ''
    })
    const [isPhoneNumber, setIsPhoneNumber] = useState([])

    const handleAddress = (ev) => {
      setIsAddress({...isAddress, [ev.target.name]: [ev.target.value]})
    }

    const closeModal =  async() => {
      $('#myModal').animate({
        width: 'toggle'
      }, 100);

      setTimeout(() => {
        navigate('/user')
      }, 100)
    }

    const handlePhone = async () => {
        $('#fon').animate({
            height: 'toggle',
            show : 'toggle'
        })
    }

    const handleLoc = async () => {
        $('#loc').animate({
            height: 'toggle',
            show : 'toggle'
        })
    }

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        if(isAddress.city.toString().length > 0){
          if(isAddress.location.toString().length > 0){
            await setDoc(doc(db, "address", user.userid),{
                         city: isAddress.city.toString(),
                         location: isAddress.location.toString()
                         })
                        .then((resp) => {
                         toast.success('Address updated successfully')
                         })
                        .catch((errors) => {
                         toast.error('Could not update Address!')
                         })
          }else{
            toast.info('Specify your location')
          }
        }else{
          toast.info('Select your city')
        }
    }

    const addressDetail = async () => {
      const colRef = doc(db, "address", user.userid);
      const docRef = await getDoc(colRef)
      
      if(docRef.exists()){
        setUserAddress(docRef.data())
      }else{
        setUserAddress([])
      }

    }

    useEffect(() => {
      addressDetail()
    })

    const handlePhoneNumber = (eve) => {
      setIsPhoneNumber('+' + eve)
    }

    const submitPhoneNumber = async (event) => {
      event.preventDefault();
      
          if(isPhoneNumber.toString() !== ''){
            await updateDoc(doc(db ,"customers", user.userid), {
                             phonenumber: isPhoneNumber.toString()
                            })
                           .then(() => {
                             axios.post('/contacts', {userid: user.userid, phonenumber: isPhoneNumber.toString()})
                                  .then((res) => {
                                       if(res.data.success){
                                        toast.success('Phone number updated successfully')
                                       }else if(res.data.error){
                                        toast.error(res.data.error)
                                       }
                                   })
                                  .catch((err) => {
                                    toast.error(err.message)
                                   })       
                            })
                           .catch((error) => {
                             toast.error('Could not update phone number!')
                            })
          }else{
            toast.info('Invalid phone number')
          }

    }

  return (
    <div id='settings'>
    <div className='open-modal' id='myModals'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
        <icons.ChevronRight className='back'/>
      </Link> 
    </div> 

    <div className='modal-scroll'> 
      <Link className='ords'> 
        <p>Settings</p>
      </Link>
    </div>

    <div className='mod'></div>
    <div className='modal-pay'>
       <button className='lipa'>
       <div>
         Phone number
       </div> 
       <icons.ChevronDown style={{fontSize: '20px'}} onClick={handlePhone}/>
       </button>
       <div id='fon'>
       <form onSubmit={submitPhoneNumber}>
       <div className='mpesa' style={{padding: '10px'}}>
        <p>New phone number</p>
        <div id='phone_code'>   
        <PhoneInput country={'ke'} name='phone' onChange={handlePhoneNumber} />
        </div>
        <button type='submit' className='tcode' id='address-btn'>Set</button>
       </div>
       </form>
       </div>
    </div>

    <div className='mod'></div>
    <div className='modal-pay'>
       <button className='lipa'>
       <div>
        Address
       </div> 
       <icons.ChevronDown style={{fontSize: '20px'}} onClick={handleLoc}/>
       </button> 
       <div id='loc'>
       <form onSubmit={handleAddressSubmit}>
       <div className='mpesa'>
        <p>Current City</p>
    <select className='tcode' name='city' onChange={handleAddress}>
     <option>Select</option>
     <option value="baringo">Baringo</option>
     <option value="bomet">Bomet</option>
     <option value="bungoma">Bungoma</option>
     <option value="busia">Busia</option>
     <option value="elgeyo marakwet">Elgeyo Marakwet</option>
     <option value="embu">Embu</option>
     <option value="garissa">Garissa</option>
     <option value="homa bay">Homa Bay</option>
     <option value="isiolo">Isiolo</option>
     <option value="kajiado">Kajiado</option>
     <option value="kakamega">Kakamega</option>
     <option value="kericho">Kericho</option>
     <option value="kiambu">Kiambu</option>
     <option value="kilifi">Kilifi</option>
     <option value="kirinyaga">Kirinyaga</option>
     <option value="kisii">Kisii</option>
     <option value="kisumu">Kisumu</option>
     <option value="kitui">Kitui</option>
     <option value="kwale">Kwale</option>
     <option value="laikipia">Laikipia</option>
     <option value="lamu">Lamu</option>
     <option value="machakos">Machakos</option>
     <option value="makueni">Makueni</option>
     <option value="mandera">Mandera</option>
     <option value="meru">Meru</option>
     <option value="migori">Migori</option>
     <option value="marsabit">Marsabit</option>
     <option value="mombasa">Mombasa</option>
     <option value="muranga">Muranga</option>
     <option value="nairobi">Nairobi</option>
     <option value="nakuru">Nakuru</option>
     <option value="nandi">Nandi</option>
     <option value="narok">Narok</option>
     <option value="nyamira">Nyamira</option>
     <option value="nyandarua">Nyandarua</option>
     <option value="nyeri">Nyeri</option>
     <option value="samburu">Samburu</option>
     <option value="siaya">Siaya</option>
     <option value="taita taveta">Taita Taveta</option>
     <option value="tana river">Tana River</option>
     <option value="tharaka nithi">Tharaka Nithi</option>
     <option value="trans nzoia">Trans Nzoia</option>
     <option value="turkana">Turkana</option>
     <option value="uasin gishu">Uasin Gishu</option>
     <option value="vihiga">Vihiga</option>
     <option value="wajir">Wajir</option>
     <option value="pokot">West Pokot</option>
    </select>
        <p>Location</p>
        <input type='text' className='tcode' name='location' placeholder={!!userAddress ? userAddress.location : 'Specify your current location'} onChange={handleAddress}/>
        <button type='submit' className='tcode' id='address-btn'>Set</button>
       </div>
       </form>
       </div>
    </div> 

    <br/>

    <div className='mod' style={{textAlign: 'center'}}>User information</div>
    <div className='modal-pay'>
     <div id='locs'>
       <span>{!!user ? user.username : ''}</span>
       <br/>
       <span>{!!user ? user.email : ''}</span>
       <br/>
       <span>{!!user ? user.phonenumber : ''}</span>
       <br/>
       <i>{!!userAddress ? userAddress.city : ''}</i>
       <br/>
       <i>{!!userAddress ? userAddress.location : ''}</i>
     </div>
    </div>
    </div>
    </div>
  )
}

export default Settings
