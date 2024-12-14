import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { UserContext } from '../context/UserContext'

const Notifications = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [isOrders, setIsOrders] = useState([])

    const closeModal =  async() => {
      $('#myModal').animate({
        width: 'toggle'
      }, 100);

      setTimeout(() => {
        navigate('/user')
      }, 100)
    }

    const fetchOrders = async() => {
      const colRef = collection(db, 'orders')
      const qRef = query(colRef, orderBy("createdAt", "desc"))
      await onSnapshot(qRef, (snapshot) => {
        let orderID = [];
    
        snapshot.docs.forEach((doces) => {
          orderID.push({...doces.data(), id: doces.id}); 
        })
       
        setIsOrders(orderID)
      })
    }

    useEffect(() => {
      fetchOrders();
    }, []) 

  return (
    <div id='notifications'>
    <div className='open-modal' id='myModals'>
   <div id='sticky'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
       <icons.ChevronRight className='back'/>
      </Link> 
    </div> 
    <div className='modal-scroll'> 
      <Link className='ords' style={{borderBottom: '3px solid #ba8c63'}}> 
        <p>Notifications</p>
      </Link>
    </div>
   </div>
    
   <div id='ord-list'>
   {!!isOrders && isOrders.map((ord) => {
    
    if(ord.progress !== 'delivered' && ord.progress !== 'cancelled'){
      return !ord;
    }

    if(ord.userid !==  user.userid){
      return !ord; 
    }
 
    return (
    <Link to={'/orders'} className='ord-nav'>
    <div className='ord-nav-nav'>
      <div className='row'>
      <h4>{ord.progress === 'delivered' ? 'Your order has been delivered.' : 'You order has been cancelled.'}</h4>
      <code>#{ord.inovice}</code>
      </div>
      <div className='row'>
        <div></div>
        <div>
         <span className={ord.progress === 'delivered' ? 'deliv' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'cancelled' ? 'canc' : 'nul'}>{ord.progress}</span>
        </div>
      </div>
      <br/>
      </div>
    </Link>
    );

   })}
  </div>

    </div>
    </div>
  )
}

export default Notifications
