import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'

const Suggestions = () => {
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
    <div id='suggestions'>
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
         <h3>Improve app experience</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Improve delivery service and time</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Offer more products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='myprblm'/>
         <h3>Improve reachability of information</h3>
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

export default Suggestions
