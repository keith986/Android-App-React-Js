import React from 'react'
import * as icons from 'react-bootstrap-icons'

const Header = () => {
  return (
    <div className='container-fluid' id='header'>
      <nav className='navbar' id='myNavbar'>
       <div className='navbar-logo'>
        <h2 className='logo'>ONLINESTORE</h2>
       </div>
       <div className='searchbar'>
        <input type='search' className='search' placeholder='Search ...'/>
        <icons.Search className='search-icon'/>
       </div>
       <div className='user-profile'>
        <icons.PersonCircle className='user-icon'/>
       </div>
      </nav>
    </div>
  )
}

export default Header
