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
    const [selectedOrd, setSelectedOrd] = useState(false)

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

      setSelectedOrd(true)
    }, [isOrderData])

    const handleOrderModal =() => {
      setIsOrderData([]);
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

    const handleActiveOrders = () => {
      setSelectedOrd(true)
    }

    const handleCanceledOrders = () => {
      setSelectedOrd(false)
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
      <Link className='ords' onClick={handleActiveOrders} id={selectedOrd ? 'bod' : 'nobod'}>
        <p>Active Orders</p>
      </Link>
      <Link className='ords' onClick={handleCanceledOrders} id={selectedOrd ? 'nobod' : 'bod'}>
        <p>Canceled Orders</p>
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
      <span>Due date:</span>
      <span style={{color: 'gray'}}>{ord.calender}</span>
      </div>
      <div className='row'>
        <div>
         <span className={ord.progress === 'Pending' ? '' : 'nul'}><icons.ThreeDots className='badg'/></span>
         <span className={ord.progress === 'in progress' ? '' : 'nul'}><icons.BarChartLineFill className='prog'/></span>
         <span className={ord.progress === 'in route' ? '' : 'nul'}><icons.Truck className='rout'/></span>
         <span className={ord.progress === 'delivered' ? '' : 'nul'}><icons.Check2Square className='deliv'/></span>
         <span className={ord.progress === 'canceled' ? '' : 'nul'}><icons.XCircleFill className='canc'/></span>
        </div>
        <div>
         <span className={ord.progress === 'Pending' ? 'badg' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'in progress' ? 'prog' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'in route' ? 'rout' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'delivered' ? 'deliv' : 'nul'}>{ord.progress}</span>
         <span className={ord.progress === 'canceled' ? 'canc' : 'nul'}>{ord.progress}</span>
        </div>
      </div>
      <br/>
      <input type='button' className='btn_ords' id={ord.id} onClick={handleOrderPrv} value='View Order'/>
      <input type='button' className={ord.progress === 'canceled' || ord.progress === 'delivered' ? 'btn_canc' : 'btn_ord' } id={ord.id} onClick={handleOrderDel} value='Cancel Order'/>
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
