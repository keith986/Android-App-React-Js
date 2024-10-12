import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'

const Orders = () => {
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
    <div id='orders'>
    <div className='open-modal' id='myModal'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div> 

    <div className='modal-scroll'> 
      <Link className='ords'>
        <p>Current Orders</p>
      </Link>
      <Link className='ords'>
        <p>My Orders</p>
      </Link>
    </div>

    </div>
    </div>
  )
}

export default Orders
