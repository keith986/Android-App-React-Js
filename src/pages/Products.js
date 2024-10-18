import React from 'react'
import sample from '../images/sample.jpeg'
import another from '../images/another.jpeg'
import yeet from '../images/yeet.jpeg'

const Products = () => {
  return (
    <div>
      <div className='container-rowss'>
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
  )
}

export default Products
