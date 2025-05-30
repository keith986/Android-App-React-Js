import { collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import $ from 'jquery'
import { toast } from 'react-toastify'
import Axios from 'axios'

const AllUsers = () => {
    const [allAddress, setAllAddress] = useState([])
    const [allCustomers, setAllCustomers] = useState([])

    async function fetchCustomers() {
    /*
        const colRef = collection(db, "customers")
        onSnapshot(colRef, (snapShot) => {
            let ctm = [];
            snapShot.docs.forEach((snaps) => {
                ctm.push({...snaps.data()})
            })
            setAllCustomers(ctm)
        })
    */
       await Axios.get('/allusers')
                  .then((response) => {
                    console.log(response.data.success.users)
                    if(response.data.success){
                        setAllCustomers(response.data.success.users)
                    }else if(response.data.error){
                        toast.error(response.data.error)
                    }
                  })
                  .catch((err) => {
                    toast.error(err.message)
                  })    
    }

    const fetchAddress = async () => {
        const colRef = collection(db, "address")
        onSnapshot(colRef, (snapShot) => {
            let addresses = [];
            snapShot.docs.forEach((snaps) => {
                addresses.push({...snaps.data()})
            })
            setAllAddress(addresses);
        })
    }

    useEffect(() => {
        fetchCustomers();
        fetchAddress();
    }, [allCustomers])

    const handleDelete = async (e) => {
        try{
            const user_id = e.target.id;
            await Axios.post('/dltuser', {userID : user_id})
                       .then((result) => {
                         if(result.data.success){
                            deleteDoc(doc(db, 'customer', user_id))
                                     .then((res) => {
                                        deleteDoc(doc(db, 'address', user_id))
                                                 .then((re) => {
                                                    $('#myModal').animate({
                                                        width: 'toggle'
                                                    })
                                                    toast.success('User deleted successfully!');
                                                  })
                                                 .catch((erra) => {
                                                    toast.error(erra.message)
                                                  })
                                      })
                                     .catch((ers) => {
                                        toast.error(ers.message)
                                      })
                         }else{
                            toast.error(result.data.error)
                         }
                        })
                       .catch((error) => {
                        toast.error(error.message)
                        })
        }catch(err){
            toast.error(err.message)
        }
    }

  return (
    <div className='container-fluid' id='cont-fd'>
      <div className='col-dv-2'>
      <h4>Users informations</h4>
      <div className='table-rs'>
      <table className='table' id='tbl'>
        <tr>
            <th>#</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Action</th>
        </tr>
       {!!allCustomers
         ?
        !!allCustomers && allCustomers.map((customer, ind) => {
            if(customer.displayName === 'admin'){
                 return !customer;
            }
            const thee_data = !!allAddress && allAddress.map((adrs) => {
                return (
                    <tr className='trs'>
                    <td>#</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{adrs.location},{adrs.city}</td>
                    <td>
                    <input type='button' id={customer.uid} onClick={handleDelete} value='Delete' style={{margin: '5px', cursor: 'pointer', zIndex: '16000', background: 'red', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px'}}/>
                    </td>
                    </tr>
                );
            })
            return (
               thee_data
            );
            
        })
         :
          'Nothing added yet'} 
      </table>
      </div>
      </div>
    </div>
  )
}

export default AllUsers
