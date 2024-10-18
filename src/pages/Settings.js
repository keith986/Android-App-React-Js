import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'

const Settings = () => {
    const navigate = useNavigate()

    const closeModal =  async() => {
      $('#myModal').animate({
        width: 'toggle'
      }, 100);

      setTimeout(() => {
        navigate('/user')
      }, 100)
    }

    const handlePass = async () => {
        $('#pswd').animate({
            height: 'toggle',
            show : 'toggle'
        })
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

  return (
    <div id='settings'>
       <div className='open-modal' id='myModal'>
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
         Password
       </div> 
       <icons.ChevronDown style={{fontSize: '20px'}} onClick={handlePass}/>
       </button>
       <div id='pswd'>
       <div className='mpesa'>
        <p>Current password</p>
        <input type='number' className='tcode' placeholder='Current Password'/>
        <p>New password</p>
        <input type='text' className='tcode' placeholder='New Password'/>
       </div>

       </div>
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
       <div className='mpesa'>
        <p>New phone number</p>
        <input type='text' className='tcode' placeholder='New Phone number'/>
       </div>
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
       <div className='mpesa'>
        <p>Current City</p>
        <select className='tcode'>
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
        <input type='text' className='tcode' placeholder='Specify your current location'/>

       </div>
       </div>
    </div>

       </div> 
    </div>
  )
}

export default Settings
