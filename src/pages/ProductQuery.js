import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'

const ProductQuery = () => {
    const navigate = useNavigate()

    const closeModal =  async() => {
        $('#myModal').animate({
          width: 'toggle'
        }, 100);
  
        setTimeout(() => {
          navigate('/help')
        }, 100)
      }

  return (
    <div id='product-query'>
    <div className='open-modal' id='myModal'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
       <icons.ChevronRight className='back'/>
      </Link> 
    </div> 
    <div className='modal-scroll'></div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Late Order</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Missing Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Expired Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Damaged Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Incorrect Product</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Issue with invoice or Payment</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
        <textarea type='text' style={{width: '100%', height: '80px', overflowY: 'auto', overflowX: 'none'}} placeholder='Optional...Any other issue?'></textarea>
        </div>
    </div>
    </div> 
    </div>
  )
}

export default ProductQuery
