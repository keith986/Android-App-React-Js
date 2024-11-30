import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { db } from '../firebase'
import { collection, deleteDoc, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'

const Orders = () => {
    const {user} = useContext(UserContext); 
    const navigate = useNavigate()
    const [isOrders, setIsOrders] = useState([])
    const [isOrderData, setIsOrderData] = useState({})
    const [orderItem, setOrderItem] = useState([])
    const [isProd, setIsProd] = useState([])

    const fetchOrders = async() => {
      const colRef = collection(db, 'orders')
      await onSnapshot(colRef, (snapshot) => {
        let orderID = [];
    
        snapshot.docs.forEach((doces) => {
          orderID.push({...doces.data(), id: doces.id}); 
        })
       
        setIsOrders(orderID)
      })
    }

    const fetchProducts = async () => {
      const qry = collection(db, 'products');
      onSnapshot(qry, (snapshot) => {
        let qrydt = [];
        snapshot.docs.forEach((snaps) => {
          qrydt.push({...snaps.data()})
        })
        setIsProd(qrydt)
      })
    }

    useEffect(() => {
      fetchOrders();
      fetchProducts();
    }, [])

    const closeModal =  async() => {
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
      setTimeout(() => {
        navigate('/user')
        }, 100)
    }

    const handleOrderPrv = async (e) => {
      await getDoc(doc(db, 'orders', e.target.id))
                  .then((result) => {
                      $('#ord-prv').animate({
                        width: 'toggle'
                      }, 100);
                      $('#ord-list').hide();
                      setIsOrderData(result.data());
                      setOrderItem(result.data().order)
                  })
                  .catch((err) => {toast.error(err.message)})
    }

    const handleOrderModal =() => {
      // document.getElementById('ord-prv').style.display = 'block';
      $('#ord-list').animate({
       width: 'toggle'
      }, 500)
      $('#ord-prv').hide()
    }

    const handleOrderDel = async (ev) => {
      await deleteDoc(doc(db, 'orders', ev.target.id))
                     .then((result) => {
                      toast.success('Deleted successfully')
                     })
                     .catch((err) => {toast.error(err.message)})
    }

  return (
    <div id='orders'>
    <div className='open-modal' id='myModals'>
    <div id='sticky'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div> 
    <div className='modal-scroll'> 
      <Link className='ords'>
        <p>Current Orders</p>
      </Link>
      <Link className='ords'>
        <p>My Orders</p>
      </Link>
    </div> 
    </div>
  
  <div id='ord-list'>
   {!!isOrders && isOrders.map((ord) => {
   
    if(ord.userid !==  user.userid){
      return !ord; 
    }
    
    return (
    <Link className='ord-nav'>
    <div className='ord-nav-nav'>
      <div className='row'>
      <h4>INVOICE NO#</h4>
      <h4>{ord.inovice}</h4>
      </div>
      <div className='row'>
      <span>Order made on:</span>
      <span style={{color: 'gray'}}>11:00 a.m , 28/ 11/ 2024</span>
      </div>
      <br/>
      <input type='button' className='btn_ords' id={ord.id} onClick={handleOrderPrv} value='View Order'/>
      <input type='button' className='btn_ord' id={ord.id} onClick={handleOrderDel} value='Cancel Order'/>
    </div>
    </Link>
    );
   })}
  </div>

  <div id='ord-prv'>
    <div className='back-bg'>
      <Link  onClick={handleOrderModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div> 
   <div className='column'>
    <div className='col'>
    <input type='radio' className='rd'/>
    <p>in progress</p>
    </div>
    <div className='col-line'></div>
    <div className='col'>
    <input type='radio' className='rd'/>
    <p>in route</p>
    </div>
    <div className='col-line'></div>
    <div className='col'>
    <input type='radio' className='rd'/>
    <p>Delivered</p>
    </div>
    
    <p className='col-pr'>Products</p> 
    <div className='table'>
    <table>
      <tr>
        <th className='tr'>Product Name</th>
        <th className='tr'>Quantity</th>
        <th className='tr'>Final Price</th>
      </tr>
      {
      !!orderItem && orderItem.map((ord) => {
        return (
        <tr>
         <td className='tr'>{ord.name}</td>
         <td className='tr'>
          {!!isProd && isProd.map((prd) => {
             if(prd.name !== ord.name){
                return !prd;
             }
            const qty = parseInt(ord.amt.replace(/,/g,"")) / parseInt(prd.sprice);
            return qty;
          })}
         </td>
         <td className='tr'>{ord.amt}</td>
        </tr>
        );
      })
     }
    </table>
    </div>
    <div className='prc-col'>
    <div className='pr'>
      <h5>Discount</h5>
      <p>{!!isOrderData && isOrderData.discount}</p>
    </div>
    <hr/>
    <div className='pr'>
      <h4>Total Price</h4>
      <p>{!!isOrderData && isOrderData.total}</p>
    </div>
    </div>

   </div>
  </div>

    </div>
    </div>
  ) 
}

export default Orders
