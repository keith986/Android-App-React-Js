import React, { useState } from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import sample from './images/sample.jpeg'
import another from './images/another.jpeg'
import yeet from './images/yeet.jpeg'

const Categories = () => {

    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
 
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
    <div id='categories'>
     <div className='back-bg'>
    <Link  onClick={handleClick}>
      <icons.ChevronRight className='back'/>
    </Link>
     </div>
 
    <div className={isModal ? 'open-modal' : 'close-modal'} id='myModal'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div>
      <div className='modal-body'>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={sample} className='img' alt='img_src'/>
            <h3>Cylinder</h3>
            <p>250.00 KES</p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={sample} className='img' alt='img_src'/>
            <h3>Cylinder</h3>
            <p>250.00 KES</p>
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
        <Link className='row-colss' onClick={handleModal}>
            <h3>Cups</h3>
            <icons.ColumnsGap className='rw-icon'/>
        </Link>
        <Link className='row-colss' onClick={handleModal}>
        <h3>Jugs</h3>
        <icons.ColumnsGap className='rw-icon'/>
        </Link>
        <Link className='row-colss' onClick={handleModal}>
        <h3>Heaters</h3>
        <icons.ColumnsGap className='rw-icon'/>
        </Link>
        <Link className='row-colss' onClick={handleModal}>
        <h3>Cookers</h3>
        <icons.ColumnsGap className='rw-icon'/>
        </Link>
        <Link className='row-colss' onClick={handleModal}>
        <h3>Spoons</h3>
        <icons.ColumnsGap className='rw-icon'/>
        </Link>
        <Link className='row-colss' onClick={handleModal}>
        <h3>Knifes</h3>
        <icons.ColumnsGap className='rw-icon'/>
        </Link>
        <Link className='row-colss' onClick={handleModal}>
        <h3>Plates</h3>
        <icons.ColumnsGap className='rw-icon'/>
        </Link>
     </div>

    </div>
  )
}

export default Categories