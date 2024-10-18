import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import sample from '../images/sample.jpeg'

const Cart = () => {
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
 
    const handleClick = async () => {
        $('.container-row').animate({
            width: 'toggle'
        });

        setTimeout(() => {
        navigate('/')
        }, 500)
    } 

    const handleModal =  async() => {
      setIsModal(true)
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
    }

    const closeModal =  async() => {
      setIsModal(false)
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
    }

    const handleLipa = () => {
        $('#payd').animate({
            height: 'toggle',
            show : 'toggle'
        })
    }

  return (
    <div id='cart'>
    <div className={isModal ? 'open-modal' : 'close-modal'} id='myModal'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div> 
    <div className='modal-header'> 
      <h3 className='header-cart'>Review and Pay</h3>

      <div className='modal-total'>
        <p>Order Value</p>
        <span>3000 KES</span>
      </div>
      <div className='modal-total'>
        <p>Discount (Offer) </p>
        <span style={{color: 'green'}}>50 KES</span>
      </div>
      <div className='modal-total'>
        <h5>Total</h5>
        <h5>2550 KES</h5>
      </div>
      <h3 className='header-cart'>Payment Method</h3>
      <div className='modal-pay'>
       <button className='lipa'>
       <div>
       <input type='checkbox'/>
        Lipa na Mpesa
       </div> 
       <icons.ChevronDown onClick={handleLipa} style={{fontSize: '20px'}} />
       </button>
       
       <div id='payd'>
       <div className='mpesa'>
        <h3>BUY GOOD AND SERVICES</h3>
        <div className='pay-bill'>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        </div>
        <p>Tech Store</p>
        <input type='text' className='tcode' placeholder='Enter Mpesa Transaction Code'/>
       </div>
       </div>

      </div>
      <div className='modal-pay' style={{marginTop: '5px'}}>
      <button className='lipa'><div><input type='checkbox'/> Cash on Delivery</div> <icons.Wallet2 style={{fontSize: '20px'}}/></button>
      </div>
    </div>
    <Link to='/orders'>
    <button type='button' className='btn_orders' onClick={handleModal}><div><icons.Cart3/> Place Order</div> <span className='finalprc'>2550 KES</span></button>
    </Link>
     </div>

     <div>

     <div className='back-bg'>
        <Link  onClick={handleClick}>
        <icons.ChevronRight className='back'/>
        </Link>
     </div>
     <h3 className='header-cart'><icons.Cart3 className='cart-icon'/> Cart</h3>
     <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '10px', paddingLeft: '10px'}}>
        <h5>Product details</h5>
        <h5>0 Products</h5>
     </div>
     <div className='container-row' id='cart-scroll'>

     <div className='cart-col'>
     <img src={sample} className='cart_img' alt='img_src'/>
     <div>
        <h5>Food Flask</h5>
        <p>250.00</p>
        <div>
        <button className='cart_button_right'><icons.Dash /></button>
        <input type='number' className='cart_input' placeholder='0'/>
        <button className='cart_button_left'><icons.Plus /></button>
        </div>
     </div>
     <Link className='xlg-link'><icons.XLg/></Link>
     </div>
     <div className='cart-col'>
     <img src={sample} className='cart_img' alt='img_src'/>
     <div>
        <h5>Food Flask</h5>
        <p>250.00</p>
        <div>
        <button className='cart_button_right'><icons.Dash /></button>
        <input type='number' className='cart_input' placeholder='0'/>
        <button className='cart_button_left'><icons.Plus /></button>
        </div>
     </div>
     <Link className='xlg-link'><icons.XLg/></Link>
     </div>
     <div className='cart-col'>
     <img src={sample} className='cart_img' alt='img_src'/>
     <div>
        <h5>Food Flask</h5>
        <p>250.00</p>
        <div>
        <button className='cart_button_right'><icons.Dash /></button>
        <input type='number' className='cart_input' placeholder='0'/>
        <button className='cart_button_left'><icons.Plus /></button>
        </div>
     </div>
    <Link className='xlg-link'><icons.XLg/></Link>
     </div>

     </div>

    </div>

    <button type='button' className='btn_order' onClick={handleModal}><div><icons.Cart3/> Confirm Order</div> <span className='finalprc'>3000 KES</span></button>
    </div>
  )
}

export default Cart 
