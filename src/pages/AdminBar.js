import React, { useContext } from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import $ from 'jquery'
import bars from '../images/bars.png'

const AdminBar = () => {
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  const handleAdminLogout = async () => {
    await auth.signOut()
              .then((res) => {
                toast.success('Successfully logged out') 
                navigate('/login');
              })
              .catch((ers) => {
                toast.error('Internal server error!')
              })
  }

  const handleTop = () => {
    $('#log-out').animate({
      width: 'toggle'
    })
    $('#my-bges').animate({
      show: 'toggle'
    })
  }

  const handleSideNav = () => {
    $('#sideNav').animate({
      width: 'toggle'
    })
    $('#my-bgses').animate({
      show: 'toggle'
    })
  }

  return (
    <div className='container'>
    <div className='backdrop-backgrounds' onClick={handleTop} id='my-bges'></div>  
    <div className='backdrop-backgrounds' onClick={handleSideNav} id='my-bgses'></div>  
      <div className='nav'>
        <div className='nav-logo'>
          <img src={bars} className='nav-img' alt='img_navbar' onClick={handleSideNav} id='nav-log'/>
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
      <div className='sidenav' id='sideNav'>
      <h4>Admin </h4>
        <div className='sidenav-container'>
          <Link to='/admin' className='links' title='Dashboard'>
           <icons.HouseDoorFill className='links-icn'/>
          </Link>
          <Link to='/allusers' className='links' title='Users'>
           <icons.Person className='links-icn'/>
          </Link>
          <Link to='/allcategories' className='links' title='Categories'>
           <icons.Grid1x2Fill className='links-icn'/>
          </Link>
          <Link to='/allproducts' className='links' title='Products'>
           <icons.Cart3 className='links-icn'/>
          </Link>
          <Link to='/allorders' className='links' title='Orders'>
           <icons.ListUl className='links-icn'/>
          </Link>
          <div className='links-nav'>
          <Link className='links' id='links-out' onClick={handleAdminLogout}>
           <icons.BoxArrowInRight className='links-icn'/>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBar
