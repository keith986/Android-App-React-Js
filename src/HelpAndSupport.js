import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'

const HelpAndSupport = () => {
    const navigate = useNavigate()

    const closeModal =  async() => {
      $('#myModal').animate({
        width: 'toggle'
      }, 100);

      setTimeout(() => {
        navigate('/user')
      }, 100)
    }

    const handleCalls = async () => {
        $('.calls').show('toggle')
        $('.call-bottom').animate({
            height: 'toggle'
        })
    }

  return (
    <div id='support-help'>
    <div className='open-modal' id='myModal'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
       <icons.ChevronRight className='back'/>
      </Link> 
    </div> 

    <div className='modal-scroll'> 
      <Link className='ords'> 
        <p>How can we help you?</p>
      </Link>
    </div>
    
    <div className='user-cols'>
        <Link to='/productquery' className='div'>
            <icons.Cart3 className='cart-icon' style={{color: 'green', boxShadow : '0 0 1px 1px green', borderRadius: '50px', padding: '5px', border: 'none'}}/>
            <h3>Problem with Order</h3>
        </Link>
    </div>

    <div className='user-cols'>
        <Link to='/suggestions' className='div'>
            <icons.Lightbulb className='cart-icon' style={{color: '#ffe135', boxShadow : '0 0 1px 1px #ffe135', borderRadius: '50px', padding: '5px', border: 'none'}}/>
            <h3>Suggestions</h3>
        </Link>
    </div>

    <div className='user-cols'>
        <Link className='div' onClick={handleCalls}>
            <icons.Headset className='cart-icon' style={{color: 'purple', boxShadow : '0 0 1px 1px purple', borderRadius: '50px', padding: '5px', border: 'none'}}/>
            <h3>Contact us</h3>
        </Link>
    </div>
    
    <div className='calls'>
    <div className='call-bottom'> 
     <icons.TelephoneFill className='call-icon'/>
     <p>Call us</p>
    </div>
    </div>

    </div> 
    </div>
  )
}

export default HelpAndSupport
