import React, { useContext } from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { auth } from '../firebase'
import { toast } from 'react-toastify'


const User = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await auth.signOut()
                  .then((resp) => {
                    toast.success('Successfully logged out')
                    navigate('/login')
                    window.location.reload();
                  })
                  .catch((errs) => {
                    toast.error('Could not log out!')
                  })
    }

  return (
    <div id='user'>
    <div className='user-col'> 
     <div> 
        <h3>{!!user && user.username}</h3>
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
        <Link className='div' onClick={handleSignOut}> 
            <icons.BoxArrowRight className='cart-icon'/>
            <h3 className='logout'>Logout</h3>
        </Link>
    </div>
    </div>
  )
}

export default User
