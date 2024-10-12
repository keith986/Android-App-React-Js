import React from 'react'
import sample from './images/sample.jpeg'
import another from './images/another.jpeg'
import yeet from './images/yeet.jpeg'

const TopProducts = () => {
  return (
    <div className='container-fluid'>
    
    <div className='row' id='row-top2'>
        <div className='row-col'>
            <img src={sample} className='img' alt='img_src'/>
            <p>250.00 KES <span id='badge'>new</span></p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-col'>
            <img src={another} className='img' alt='img_src'/>
            <p>200.00 KES <span id='badge'>new</span></p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
        <div className='row-col'>
            <img src={yeet} className='img' alt='img_src'/>
            <p>210.00 KES <span id='badge'>new</span></p>
            <button className='add-to-cart'>Add to Cart</button>
        </div>
    </div>
  
    </div>
  )
}

export default TopProducts
