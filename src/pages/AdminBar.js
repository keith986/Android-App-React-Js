import React, { useContext } from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import $ from 'jquery'

const AdminBar = () => {
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  const handleAdminLogout = async () => {
    await auth.signOut()
              .then((res) => {
                toast.success('Successfully logged out')    
                  navigate('/login')  
              })
              .catch((ers) => {
                toast.error('Internal server error!')
              })
  }

  const handleTop = () => {
    $('#log-out').animate({
      width: 'toggle'
    })
  }

  return (
    <div className='container'>
      <div className='nav'>
        <div className='nav-logo'>
          <h2>ONLINESTORE</h2>
        </div>
        <div className='nav-navbar'>
          <icons.BellFill className='not-icn'/>
          <icons.PersonCircle className='nav-item-icn' onClick={handleTop}/>
          <div id='log-out'>
            <div>
              <h5>{!!user && user.username}</h5>
              <sup>{!!user && user.email}</sup>
              <hr/>
              <input type='button' className='logout-links' value='Log out' onClick={handleAdminLogout}/> 
            </div>
          </div>
        </div>
      </div>
      <div className='sidenav'>
        <div className='sidenav-container'>
          <h4>Admin Panel</h4>
          <Link to='/admin' className='links'>
           <icons.ColumnsGap className='links-icn'/>
           <span>Dashboard</span>
          </Link>
          <Link to='/allusers' className='links'>
           <icons.Person className='links-icn'/>
           <span>Users</span>
          </Link>
          <Link to='/allcategories' className='links'>
           <icons.Grid1x2Fill className='links-icn'/>
           <span>Categories</span>
          </Link>
          <Link to='/allproducts' className='links'>
           <icons.Cart3 className='links-icn'/>
           <span>Products</span>
          </Link>
          <Link to='/allorders' className='links'>
           <icons.ListUl className='links-icn'/>
           <span>Orders</span>
          </Link>
          <div className='links-nav'>
          <Link className='links' id='links-out' onClick={handleAdminLogout}>
           <icons.BoxArrowInRight className='links-icn'/>
           <span>Logout</span>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBar
