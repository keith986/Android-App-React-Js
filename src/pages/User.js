import React from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const User = () => {
  return (
    <div id='user'>
    <div className='user-col'> 
     <div> 
        <h3>HELLO STEVE</h3>
     </div>
     <Link to='/notifications'>
     <icons.BellFill className='cart-icon'/>
     </Link>
    </div>
    <div className='user-cols'>
        <Link to='/orders' className='divs'>
            <icons.Cart3 className='cart-icon'/>
            <p>My Orders</p>
        </Link>
        <Link to='/coupons' className='divs'>
            <icons.CardText className='cart-icon'/>
            <p>Coupons</p>
        </Link>
    </div>
    <div className='user-cols'>
        <Link to='/help' className='div'>
            <icons.Headset className='cart-icon'/>
            <h3>Help and support</h3>
        </Link>
    </div>
    <div className='user-cols'>
        <Link to='/settings' className='div'>
            <icons.GearFill className='cart-icon'/>
            <h3>Settings</h3>
        </Link>
    </div>
    <div className='user-cols' id='logout'>
        <Link className='div'> 
            <icons.BoxArrowRight className='cart-icon'/>
            <h3 className='logout'>Logout</h3>
        </Link>
    </div>
    </div>
  )
}

export default User
