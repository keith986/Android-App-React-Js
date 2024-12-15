import React from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { toast } from 'react-toastify'

const AdminBar = () => {
  const navigate = useNavigate()

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

  return (
    <div className='container'>
      <div className='nav'>
        <div className='nav-logo'>
          <h2>ONLINESTORE</h2>
        </div>
        <div className='nav-navbar'>
          <icons.BellFill className='not-icn'/>
          <icons.ChatRightTextFill className='not-icn'/>
          <icons.PersonCircle className='nav-item-icn'/>
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
          <Link className='links'>
           <icons.Truck className='links-icn'/>
           <span>Delivery</span>
          </Link>
          <div className='links-nav'>
          <Link className='links'>
           <icons.Gear className='links-icn'/>
           <span>Settings</span>
          </Link>
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
