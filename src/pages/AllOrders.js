import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import React, {  useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { UserContext } from '../context/UserContext'
import jsPDF from 'jspdf'

const AllOrders = () => {
    const [isOrders, setIsOrders] = useState([])
    const {user} = useContext(UserContext)
    const [orderItems, setOrderItems] = useState([])
    const [isProd, setIsProd] = useState([])
    const [isOrderData, setIsOrderData] = useState({})

    const fetchOrders = async () => {
        const colRef = collection(db, "orders")
        const qRef = query(colRef, orderBy("createdAt", "desc"))
        onSnapshot(qRef, (snapShot) => {
                let ord_ers = [];
                snapShot.docs.forEach((snaps) => {
                   ord_ers.push({...snaps.data(), id: snaps.id})
                })
            setIsOrders(ord_ers);
        })  
    }

    const handleToggleEdit = async (e) => {
        $('#clrs-'+e.target.id).animate({
            show: 'toggle'
        })
    }

    const handleEditClose = async (eve) =>{
        $('#clrs-'+ eve.target.id).animate({
            show: 'toggle'
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

    const handleDelete = async (ev) => {
        await deleteDoc(doc(db, 'orders', ev.target.id))
                       .then((res) => {
                         toast.success('Successfully deleted')
                       })
                       .catch((err) => {
                        toast.error(err.message)
                       })
    }

    const handleUpdateProgress = async (e) => {
        try{
            await updateDoc(doc(db, 'orders', e.target.id),{
                progress: 'in progress'
              })
              .then((res) => {
                  toast.success('Updated successfully')
              })
              .catch((err) => {
                  toast.error(err.message)
              })
        }catch(err){
            toast.error(err.message)
        }
    }

    const handleUpdateRoute = async (e) => {
        try{
            await updateDoc(doc(db, 'orders', e.target.id),{
                progress: 'in route'
              })
              .then((res) => {
                  toast.success('Updated successfully')
              })
              .catch((err) => {
                  toast.error(err.message)
              })
        }catch(err){
            toast.error(err.message)
        }
    }

    const handleUpdateDelivered = async (e) => {
        try{
            await updateDoc(doc(db, 'orders', e.target.id),{
                progress: 'delivered'
              })
              .then((res) => {
                  toast.success('Updated successfully')
              })
              .catch((err) => {
                  toast.error(err.message)
              })
        }catch(err){
            toast.error(err.message)
        }
    }

    const handleReceipt = async(ev) => {
        await getDoc(doc(db, 'orders', ev.target.id))
                    .then((resp) => {
                        $('#myModales').animate({
                            width: 'toggle'
                        })
                        setIsOrderData(resp.data())
                        setOrderItems(resp.data().order)
                    })
                    .catch((err) => toast.error(err.message))
        $('#my-bgsess').animate({
            width : 'toggle'
        })
    }

    const handleReceiptMod = () => {
        $('#my-bgsess').animate({
            width : 'toggle'
        })
        $('#myModales').animate({
            width: 'toggle'
        })
    }

    const handleCloseMod = () => {
        $('#myModales').animate({
            width: 'toggle'
        })
        $('#my-bgsess').animate({
            width : 'toggle'
        })
    }

    const handleDownload = () => {
        $('#fot').hide();
        const elemHtml = document.querySelector('#receipt');
        let docPDF = new jsPDF();
        docPDF.html(elemHtml,{
          callback:function(docPDF){
              docPDF.save('receipt.pdf');
           },
            x: 15,
            y: 15,
            width: 70,
            windowWidth: 300
        })
        setTimeout(() => {
          $('#fot').show();
        }, 500)
        $('#myModales').animate({
            width: 'toggle'
        })
        $('#my-bgsess').animate({
            width : 'toggle'
        })
    }

    return (
    <div className='container-fluid' id='cont-fd'>
        <div className='backdrop-background' onClick={handleReceiptMod} id='my-bgsess'></div>
        <div className='modal' id='myModales'> 
            <div className='modal-content' id='receipt'> 
             <div className='modal-header'>
              <h2>ONLINESTORE</h2>
              <sup>Receipt</sup>
              <p>{!!user && user.email}</p>
             </div>  
             <div className='modal-body'>
             <div className='table'>
    <table>
      <tr>
        <th className='tr'>Product Name</th>
        <th className='tr'>Quantity</th>
        <th className='tr'>Final Price</th>
      </tr>
      {
      !!orderItems && orderItems.map((ord) => {
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
             <div className='modal-footer' id='fot'>
             <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleCloseMod}>Back</button>
             <button type='submit'  className='mod-btn' id='mod-btn-grn' onClick={handleDownload}>Download</button>
             </div>
            </div>
        </div>
    <div className='col-dv-2'>
    <span style={{display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
    <h4>Orders details</h4>
    </span>
    <div className='table-rs'>
    <table className='table' id='tbl'>
      <tr>
          <th>#</th>
          <th>Invoice No.</th>
          <th>CreatedAt</th>
          <th>Stage</th>
          <th>Action</th>
      </tr>  
      {!!isOrders && isOrders.map((prd, indx) => {
        return (
            <tr>
                <td>{indx + 1}.</td>
                <td>{prd.inovice}</td>
                <td>{prd.calender}</td>
                <td>
                 <span className={prd.progress === 'Pending' ? 'badg' : 'nul'}>{prd.progress}</span>
                 <span className={prd.progress === 'in progress' ? 'prog' : 'nul'}>{prd.progress}</span>
                 <span className={prd.progress === 'in route' ? 'rout' : 'nul'}>{prd.progress}</span>
                 <span className={prd.progress === 'delivered' ? 'deliv' : 'nul'}>{prd.progress}</span>
                 <span className={prd.progress === 'cancelled' ? 'canc' : 'nul'}>{prd.progress}</span>
                </td>
                <td>
                  <div className='clrs' id={'clrs-'+ prd.id}>
                    <Link className='Link' id={prd.id} onClick={handleUpdateProgress}>in Progress</Link>
                    <Link className='Link' id={prd.id} onClick={handleUpdateRoute}>in Route</Link>
                    <Link className='Link' id={prd.id} onClick={handleUpdateDelivered}>Delivered</Link>
                    <Link id={prd.id} className='Links' onClick={handleEditClose}>Close</Link>
                  </div>
                  <input type='button' id={prd.id} onClick={handleToggleEdit} className='edit-bnt' value='Edit' style={{margin: '5px', cursor: 'pointer', zIndex: '16000',  background: 'blue', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px'}}/>
                  <input type='button' id={prd.id} onClick={handleDelete} value='Delete' style={{margin: '5px', cursor: 'pointer', zIndex: '16000', background: 'red', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px'}}/>
                  <input type='button' id={prd.id} onClick={handleReceipt} value='Receipt' style={{margin: '5px', cursor: 'pointer', zIndex: '16000',  background: 'purple', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px'}}/>
               </td>
            </tr>
        );
      })}
    </table>
    </div>
    </div>
    </div>
  )
}

export default AllOrders
