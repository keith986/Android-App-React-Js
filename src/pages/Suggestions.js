import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'

const Suggestions = () => {
  const {user} = useContext(UserContext);
    const navigate = useNavigate()
    const [isSuggestion, setIsSuggestion] = useState({
      prblmone : '',
      prblmtwo : '',
      prblmthree : '',
      prblmfour : '',
      others : ''
    })

    const handleChange = (e) => {
      setIsSuggestion({...isSuggestion, [e.target.name]:[e.target.value] })
    }

    const closeModal =  () => {
        $('#myModal').animate({
          width: 'toggle'
        }, 100);
  
        setTimeout(() => {
          navigate('/help')
        }, 100)
    }

    async function handleSubmitSuggestions(event) {
      event.preventDefault();
    if(isSuggestion.prblmone.toString() !== '' || isSuggestion.prblmtwo.toString() !== '' || isSuggestion.prblmthree.toString() !== '' || isSuggestion.prblmfour !== '' || isSuggestion.others !== '' ){

      await setDoc(doc(db, "suggestions", user.userid), {
                    prblmone : isSuggestion.prblmone.toString(),
                    prblmtwo : isSuggestion.prblmtwo.toString(),
                    prblmthree : isSuggestion.prblmthree.toString(),
                    prblmfour : isSuggestion.prblmfour.toString(),
                    others : isSuggestion.others.toString()
                  })
                  .then((resp) => {
                    toast.success('Thank you for your suggestion(s)')
                  })
                  .catch((ers) => {
                    toast.error('Could not update your suggestions!')
                  })
    
    }else{
      toast.info('No suggestion selected!')
    }
    }

  return (
    <div id='suggestions'>
    <div className='open-modal' id='myModals'>

    <div className='back-bg'>
      <Link  onClick={closeModal}>
       <icons.ChevronRight className='back'/>
      </Link> 
    </div> 

    <div className='modal-scroll'></div>
  <form onSubmit={handleSubmitSuggestions}>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Improve app experience' name='prblmone' onChange={handleChange}/>
         <h3>Improve app experience</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Improve delivery service and time' name='prblmtwo' onChange={handleChange}/>
         <h3>Improve delivery service and time</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Offer more products' name='prblmthree' onChange={handleChange}/>
         <h3>Offer more products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Improve reachability of information' name='prblmfour' onChange={handleChange}/>
         <h3>Improve reachability of information</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
        <textarea type='text' onChange={handleChange} style={{width: '100%', height: '80px', overflowY: 'auto', overflowX: 'none'}} placeholder='Optional...Any other issue?' name='others'></textarea>
        </div>
    </div>
    <div id='suggest-btn'>
    <button type='submit' className='tcode'>Submit</button>
    </div>
  </form>
    </div> 
    </div>
  )
}

export default Suggestions
