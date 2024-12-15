import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import React, {  useEffect, useState } from 'react'
import { db } from '../firebase'
import * as icons from 'react-bootstrap-icons'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import $ from 'jquery'

const AllOrders = () => {
    const [isOrders, setIsOrders] = useState([])

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

    useEffect(() => {
        fetchOrders();
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

    return (
    <div className='container-fluid' id='cont-fd'>
    
    <div className='col-dv-2'>
    <span style={{display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
    <h4>Orders details</h4>
    </span>
    <table className='table'>
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
                    <button id={prd.id} onClick={handleToggleEdit} style={{margin: '5px', cursor: 'pointer', zIndex: '16000'}}><icons.PencilFill id={prd.id} onClick={handleToggleEdit} className='td-icn' title='edit' style={{ zIndex: '100'}}/></button>
                    <button id={prd.id} onClick={handleDelete} style={{margin: '5px', cursor: 'pointer', zIndex: '16000'}}><icons.Trash3Fill id={prd.id} onClick={handleDelete} className='td-icn' style={{color: 'rgb(227, 15, 15)', zIndex: '100'}} title='delete' /></button>
                </td>
            </tr>
        );
      })}
    
    </table>
    </div>

    </div>
  )
}

export default AllOrders
