import React from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const CategoriesAndOffers = () => {
  return (
    <div className='container-fluid'>
      <div className='row-offers'>
        <Link to='/categories' className='row' id='rw'>
          <h5>Categories</h5>
          <icons.Grid className='rw-icon'/>
        </Link>
        <Link to='/offers' className='row' id='rw'>
          <h5>Offers</h5>
          <icons.GiftFill className='rw-icon' id='gift-cl'/>
        </Link>
      </div>
   
    </div>
  )
}

export default CategoriesAndOffers

