import React from 'react'
import * as icons from 'react-bootstrap-icons'

const AdminDashboard = () => {
  return (
    <div className='container-fluid' id='cont-fd'>
      <div className='rows'>
         <div className='col-3'>
           <span>USERS</span>
           <div className='alt'>
           <h2>100</h2>
           <icons.PeopleFill className='alt-icn'/>  
           </div>
         </div>
         <div className='col-3'>
           <span>PRODUCTS</span>
           <div className='alt'>
           <h2>100</h2>
           <icons.Basket2 className='alt-icn'/>  
           </div>
         </div>
         <div className='col-3'>
           <span>ORDERS</span>
           <div className='alt'>
           <h2>100</h2>
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
