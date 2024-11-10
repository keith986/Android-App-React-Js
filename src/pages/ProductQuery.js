import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { UserContext } from '../context/UserContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'

const ProductQuery = () => {
  const {user} = useContext(UserContext)  
  const navigate = useNavigate()

  const closeModal =  async() => {
        $('#myModal').animate({
          width: 'toggle'
        }, 100);
  
        setTimeout(() => {
          navigate('/help')
        }, 100)
  }

  const [isQry, setIsQry] = useState({
    qryone : '',
    qrytwo : '',
    qrythree : '',
    qryfour : '',
    qryfive : '',
    otherqry : ''
  })

  const handleChange = (e) => {
    setIsQry({...isQry, [e.target.name] : [e.target.value] })
  }

  async function handleSubmitQry(ev) {
      ev.preventDefault();
    if(isQry.qryone.toString() !== '' || isQry.qrytwo.toString() !== '' || isQry.qrythree.toString() !== '' || isQry.qryfour.toString() !== '' || isQry.qryfive.toString() !== '' || isQry.otherqry.toString() !== ''){

      await setDoc(doc(db, "productquery", user.userid), {
                   qryone : isQry.qryone.toString(),
                   qrytwo : isQry.qrytwo.toString(),
                   qrythree : isQry.qrythree.toString(),
                   qryfour : isQry.qryfour.toString(),
                   qryfive : isQry.qryfive.toString(),
                   otherqry : isQry.otherqry.toString()
                  })
                  .then((res) => {
                    toast.success('Submitted successfully')
                  })
                  .catch((ers) => {
                    toast.error('Could not submit your query!')
                  })

    }else{
      toast.info('No selection made')
    }
  }  

  return (
    <div id='product-query'>
    <div className='open-modal' id='myModals'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
       <icons.ChevronRight className='back'/>
      </Link> 
    </div> 
    <div className='modal-scroll'></div>
  
  <form onSubmit={handleSubmitQry}>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Late Order' name='qryone' onChange={handleChange}/>
         <h3>Late Order</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Missing Products' name='qrytwo' onChange={handleChange}/>
         <h3>Missing Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Expired Products' onChange={handleChange}/>
         <h3>Expired Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Damaged Products' name='qrythree' onChange={handleChange}/>
         <h3>Damaged Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Incorrect Product' name='qryfour' onChange={handleChange}/>
         <h3>Incorrect Product</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Issue with invoice or Payment' name='qryfive' onChange={handleChange}/>
         <h3>Issue with invoice or Payment</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
        <textarea type='text' name='otherqry' onChange={handleChange} style={{width: '100%', height: '80px', overflowY: 'auto', overflowX: 'none'}} placeholder='Optional...Any other issue?'></textarea>
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

export default ProductQuery
