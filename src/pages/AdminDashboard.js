import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import * as icons from 'react-bootstrap-icons'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { db } from '../firebase'

const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [allOrders, setAllOrders] = useState([])

  const fetchAllUsers = async () => {
    await Axios.get('/allusers')
               .then((resp) => {
                if(resp.data.success){
                 setAllUsers(resp.data.success.users)
                }
                if(resp.data.error){
                  toast.error(resp.data.error)
                }
               })
               .catch((err) => toast.error(err.message))
  }

  const fetchAllProducts = async () => {
    const colRef = collection(db, 'products')
    await onSnapshot(colRef, (snapshot) => {
      let all_prod = [];
      snapshot.docs.forEach((snap) => {
          all_prod.push(snap.data())
      })
      setAllProducts(all_prod)
    })
  }

  const fetchAllOrders = async () => {
    const colRef = collection(db, 'orders')
    await onSnapshot(colRef, (snapshot) => {
      let all_ord = [];
      snapshot.docs.forEach((snap) => {
          all_ord.push(snap.data())
      })
      setAllOrders(all_ord)
    })
  }

  useEffect(() => {
    fetchAllUsers()
    fetchAllProducts()
    fetchAllOrders()
  }, [])

  return (
    <div className='container-fluid' id='cont-fd'>
      <div className='rows'>
         <div className='col-3'>
           <span>USERS</span>
           <div className='alt'>
           <h2>{!!allUsers && allUsers.length - 1}</h2>
           <icons.PeopleFill className='alt-icn'/>  
           </div>
         </div>
         <div className='col-3'>
           <span>PRODUCTS</span>
           <div className='alt'>
           <h2>{!!allProducts && allProducts.length}</h2>
           <icons.Basket2 className='alt-icn'/>  
           </div>
         </div>
         <div className='col-3'>
           <span>ORDERS</span>
           <div className='alt'>
           <h2>{!!allOrders && allOrders.length}</h2>
           <icons.ListOl to={'/allorders'} className='alt-icn'/>  
           </div>
         </div>
         <div className='col-3'>
           <div className='alt'>
           <span>EARNINGS</span>
           <span style={{color: 'green'}}>Kes</span>
           </div>
           <div className='alt'>
           <h2>100</h2>
           <icons.Wallet className='alt-icn'/>  
           </div>
         </div>
      </div>
    </div>
  )
}

export default AdminDashboard
