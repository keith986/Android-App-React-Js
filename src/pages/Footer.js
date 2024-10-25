import React, { useContext, useEffect} from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Footer = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className='container' id='footer'>
      <div className='row' id='row-footer'>
        
        <Link className='div' to={'/dashboard'}>
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
