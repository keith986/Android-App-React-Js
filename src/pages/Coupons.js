import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'

const Coupons = () => {
    const navigate = useNavigate()

    const closeModal =  async() => {
      $('#myModal').animate({
        width: 'toggle'
      }, 100);

      setTimeout(() => {
        navigate('/user')
      }, 100)
    }

  return (
    <div id='coupons'>
    <div className='open-modal' id='myModals'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
       <icons.ChevronRight className='back'/>
      </Link> 
    </div> 

    <div className='modal-scroll'> 
      <Link className='ords' style={{borderBottom: '3px solid #ba8c63'}}> 
        <p>Active Coupons</p>
      </Link>
    </div>
    
    </div>
    </div>
  )
}

export default Coupons
