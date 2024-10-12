import React from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='container' id='footer'>
      <div className='row' id='row-footer'>
        
        <Link className='div' to={'/'}>
        <icons.HouseFill className='fot' /> 
        <code>Home</code>
        </Link> 
               
        <Link className='div' to={'/categories'}>
        <icons.Grid className='fot' />
        <code>Category</code>
        </Link>

        <Link className='div' to={'/offers'}>
         <icons.GiftFill className='fot' />
         <code>Offers</code>
        </Link> 

        <Link className='div' to={'/cart'}>
        <icons.CartFill className='fot' /> 
        <code>Cart</code>
        </Link>

        <Link className='div' to={'/user'}>
        <icons.PersonFill className='fot' />
        </Link> 
      </div>
    </div>
  )
}

export default Footer
