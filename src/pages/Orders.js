import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { db } from '../firebase'
import { collection,doc, getDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'

const Orders = () => {
    const {user} = useContext(UserContext); 
    const navigate = useNavigate()
    const [isOrders, setIsOrders] = useState([])
    const [isOrderData, setIsOrderData] = useState({})
    const [orderItem, setOrderItem] = useState([])
    const [isProd, setIsProd] = useState([])
    const [selectedOrd, setSelectedOrd] = useState('active')

    const fetchOrders = async() => {
      const colRef = collection(db, 'orders')
      const qRef = query(colRef, orderBy('calender'))
      await onSnapshot(qRef, (snapshot) => {
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
/*
                  if(document.getElementById('chek')){
                    document.getElementById('chek').disabled = false;
                    $('#chek').trigger('click');
                  }
            
                  if(document.getElementById('cheks')){
                    document.getElementById('cheks').disabled = false;
                    $('#cheks').trigger('click');
                  }
                     
                  if(document.getElementById('chekd')){
                    document.getElementById('chekd').disabled = false;
                    $('#chekd').trigger('click');
                  }
  */
    }

    useEffect(() => {
      if(document.getElementById('chek')){
        document.getElementById('chek').disabled = false;
        $('#chek').trigger('click');
      }else{
        document.getElementById('no-chek').disabled = true;
        document.getElementById('no-chek').checked = false;
      } 

      if(document.getElementById('cheks')){
        document.getElementById('cheks').disabled = false;
        $('#cheks').trigger('click');
      }else{
        document.getElementById('no-cheks').disabled = true;
        document.getElementById('no-cheks').checked = false;
      } 
         
      if(document.getElementById('chekd')){
        document.getElementById('chekd').disabled = false;
        $('#chekd').trigger('click');
      }else{
        document.getElementById('no-chekd').disabled = true;
        document.getElementById('no-chekd').checked = false;
      } 
      setSelectedOrd('active') 
    }, [isOrderData])

    const handleOrderModal =() => {
      setIsOrderData([]);
      $('#ord-list').animate({
       width: 'toggle'
      }, 500)
      $('#ord-prv').hide()
    }

    const handleOrderDel = async (ev) => {
      await updateDoc(doc(db, 'orders', ev.target.id),{
                        progress: 'cancelled'
                     })
                     .then((result) => {
                      toast.success('Cancelled successfully')
                     })
                     .catch((err) => {toast.error(err.message)})
    }

    const handleActiveOrders = () => {
      setSelectedOrd('active');
    }

    const handleCanceledOrders = () => {
      setSelectedOrd('cancelled')
    }

    const handleCompleteOrders = () => {
      setSelectedOrd('complete')
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
      <Link className='ords' to='/orders/#active' onClick={handleActiveOrders} id={selectedOrd === 'active' ? 'bod' : 'nobod'}>
        <p>Active</p>
      </Link>
      <Link className='ords' to='/orders/#completed' onClick={handleCompleteOrders} id={selectedOrd === 'complete' ? 'bod' : 'nobod'}>
        <p>Completed</p>
      </Link>
      <Link className='ords' to='/orders/#cancelled' onClick={handleCanceledOrders} id={selectedOrd === 'cancelled' ? 'bod' : 'nobod'}>
        <p>Cancelled</p>
      </Link>
    </div> 
    </div>
  
  <div className={selectedOrd === 'active' ? 'bod' : 'nobod'} id='ord-list'>
   {!!isOrders && isOrders.map((ord) => {
   
    if(ord.userid !==  user.userid || ord.progress === 'cancelled' || ord.progress === 'delivered'){
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
      <span>Due date:</span>
      <span style={{color: 'gray'}}>{ord.calender}</span>
      </div>
      <div className='row'>
        <div>
         <span className={ord.progress === 'Pending' ? '' : 'nul'}><icons.ThreeDots className='badg'/></span>
         <span className={ord.progress === 'in progress' ? '' : 'nul'}><icons.BarChartLineFill className='prog'/></span>
         <span className={ord.progress === 'in route' ? '' : 'nul'}><icons.Truck className='rout'/></span>
         <span className={ord.progress === 'delivered' ? '' : 'nul'}><icons.Check2Square className='deliv'/></span>
         <span className={ord.progress === 'cancelled' ? '' : 'nul'}><icons.XCircleFill className='canc'/></span>
        </div>
        <div>
         <span className={ord.progress === 'Pending' ? 'badg' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'in progress' ? 'prog' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'in route' ? 'rout' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'delivered' ? 'deliv' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'cancelled' ? 'canc' : 'nul'}>{ord.progress}</span>
        </div>
      </div>
      <br/>
      <input type='button' className='btn_ords' id={ord.id} onClick={handleOrderPrv} value='View Order'/>
      <input type='button' className={ord.progress === 'cancelled' || ord.progress === 'delivered' ? 'btn_canc' : 'btn_ord' } id={ord.id} onClick={handleOrderDel} value='Cancel Order'/>
    </div>
    </Link>
    );

   })}
  </div>

  <div className={selectedOrd === 'complete' ? 'bod' : 'nobod'} id='ord-list'>
   {!!isOrders && isOrders.map((ord) => {
   
    if(ord.userid !==  user.userid || ord.progress !== 'delivered'){
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
      <span>Due date:</span>
      <span style={{color: 'gray'}}>{ord.calender}</span>
      </div>
      <div className='row'>
        <div>
         <span className={ord.progress === 'Pending' ? '' : 'nul'}><icons.ThreeDots className='badg'/></span>
         <span className={ord.progress === 'in progress' ? '' : 'nul'}><icons.BarChartLineFill className='prog'/></span>
         <span className={ord.progress === 'in route' ? '' : 'nul'}><icons.Truck className='rout'/></span>
         <span className={ord.progress === 'delivered' ? '' : 'nul'}><icons.Check2Square className='deliv'/></span>
         <span className={ord.progress === 'cancelled' ? '' : 'nul'}><icons.XCircleFill className='canc'/></span>
        </div>
        <div>
         <span className={ord.progress === 'Pending' ? 'badg' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'in progress' ? 'prog' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'in route' ? 'rout' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'delivered' ? 'deliv' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'cancelled' ? 'canc' : 'nul'}>{ord.progress}</span>
        </div>
      </div>
      <br/>
      <input type='button' className='btn_ords' id={ord.id} onClick={handleOrderPrv} value='View Order'/>
      <input type='button' className={ord.progress === 'cancelled' || ord.progress === 'delivered' ? 'btn_canc' : 'btn_ord' } id={ord.id} onClick={handleOrderDel} value='Cancel Order'/>
    </div>
    </Link>
    );

   })}
  </div>

  <div className={selectedOrd === 'cancelled' ? 'bod' : 'nobod'} id='ord-list'>
   {!!isOrders && isOrders.map((ord) => {
   
    if(ord.userid !==  user.userid || ord.progress !== 'cancelled'){
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
      <span>Due date:</span>
      <span style={{color: 'gray'}}>{ord.calender}</span>
      </div>
      <div className='row'>
        <div>
         <span className={ord.progress === 'Pending' ? '' : 'nul'}><icons.ThreeDots className='badg'/></span>
         <span className={ord.progress === 'in progress' ? '' : 'nul'}><icons.BarChartLineFill className='prog'/></span>
         <span className={ord.progress === 'in route' ? '' : 'nul'}><icons.Truck className='rout'/></span>
         <span className={ord.progress === 'delivered' ? '' : 'nul'}><icons.Check2Square className='deliv'/></span>
         <span className={ord.progress === 'cancelled' ? '' : 'nul'}><icons.XCircleFill className='canc'/></span>
        </div>
        <div>
         <span className={ord.progress === 'Pending' ? 'badg' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'in progress' ? 'prog' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'in route' ? 'rout' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'delivered' ? 'deliv' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'cancelled' ? 'canc' : 'nul'}>{ord.progress}</span>
        </div>
      </div>
      <br/>
      <input type='button' className='btn_ords' id={ord.id} onClick={handleOrderPrv} value='View Order'/>
      <input type='button' className={ord.progress === 'cancelled' || ord.progress === 'delivered' ? 'btn_canc' : 'btn_ord' } id={ord.id} onClick={handleOrderDel} value='Cancel Order'/>
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
     <input type='radio' className='rd'  id={!!isOrderData ? isOrderData.progress === 'in progress' || isOrderData.progress === 'in route' || isOrderData.progress === 'delivered' ? 'chek' : 'no-chek' : 'no-chek'}  disabled/>
     <p>in progress</p>
    </div>
    <div className='col-line' id={!!isOrderData ? isOrderData.progress === 'in progress' || isOrderData.progress === 'in route' || isOrderData.progress === 'delivered' ? 'clrd' : '' : ''}></div>
    <div className='col'>
    <input type='radio' className='rd' id={!!isOrderData ? isOrderData.progress === 'in route' || isOrderData.progress === 'delivered' ? 'cheks' : 'no-cheks' : 'no-cheks'} disabled/>
    <p>in route</p>
    </div>
    <div className='col-line' id={!!isOrderData ? isOrderData.progress === 'in route' || isOrderData.progress === 'delivered' ? 'clrs' : '' : ''}></div>
    <div className='col'>
    <input type='radio' className='rd' id={!!isOrderData && isOrderData.progress === 'delivered' ? 'chekd' : 'no-chekd'} disabled/>
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
