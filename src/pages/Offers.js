import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as icons from 'react-bootstrap-icons'
import $ from 'jquery'
import sample from '../images/sample.jpeg'
import another from '../images/another.jpeg'
import yeet from '../images/yeet.jpeg'

const Offers = () => {

    const navigate = useNavigate();

    const [isModal, setIsModal] = useState(false);
 
    const handleClick = async () => {
        $('.container-row').animate({
            width: 'toggle'
        }, 100);

        setTimeout(() => {
         navigate('/');
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

  return (
    <div id='offers'>
    <div className='back-bg'>
    <Link  onClick={handleClick}>
      <icons.ChevronRight className='back'/>
    </Link>
    </div>
    
    <h3 className='header-offers'><icons.LightningChargeFill className='offer-icon'/> Flash Sales and Offers</h3>

    <div className={isModal ? 'open-modal' : 'close-modal'} id='myModal'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div>
      <div className='modal-body'>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={sample} className='img' alt='img_src'/>
            <p>250.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={another} className='img' alt='img_src'/>
            <p>200.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={yeet} className='img' alt='img_src'/>
            <p>210.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={yeet} className='img' alt='img_src'/>
            <p>210.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={sample} className='img' alt='img_src'/>
            <p>250.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={another} className='img' alt='img_src'/>
            <p>200.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={yeet} className='img' alt='img_src'/>
            <p>210.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={yeet} className='img' alt='img_src'/>
            <p>210.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
      </div>
    </div>

     <div className='container-row' style={{marginTop: '10%'}}> 
        <div className='row-colssss'>
        <div>
        <h3>Days</h3>
        <span className='rw-icon'>0</span> 
        </div>
        <div>
        <h3>Hours</h3>
        <span className='rw-icon'>0</span>
        </div>
        <div>
        <h3>Mins</h3>
        <span className='rw-icon'>0</span>
        </div>
        <div>
        <h3>Secs</h3>
        <span className='rw-icon'>0</span>
        </div>
        </div>
        <Link className='row-colsss' onClick={handleModal}>
        <h3>Just for you</h3>
        <icons.LightningChargeFill className='rw-icons' style={{color: 'rgb(237, 202, 4)'}}/> 
        </Link>
     </div>

    </div>
  )
}

export default Offers
