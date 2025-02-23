import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'

const Coupons = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [isCoupons, setIsCoupons] = useState([])

    const closeModal =  async() => {
      $('#myModal').animate({
        width: 'toggle'
      }, 100);

      setTimeout(() => {
        navigate('/user')
      }, 100)
    }

    async function fetchCoupons () {
        const colRef = collection(db, "coupons")
        onSnapshot(colRef, (snapshot) => {
          let coupons = [];
          snapshot.docs.forEach((snaps) => {
            coupons.push({...snaps.data(), id: snaps.id})
          })
          setIsCoupons(coupons);
        })
    }
    
    useEffect(() => {
      fetchCoupons()
    }, [])

    async function activateCoupon (e) {
        const colRef = doc(db, "coupons", e.target.id);
        await updateDoc(colRef, {
          isActivated: 'activated'
        })
        .then((res) => {
          toast.success("Activated coupon successfully")
        })
        .catch((err) => {
          toast.error("Could not activate coupon")
        })
      }

  return (
    <div id='coupons'>
    <div className='open-modal' id='myModals'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
       <icons.ChevronRight className='back'/>
      </Link> 
    </div> 

    <div className='modal-scroll'> 
      <Link className='ords' style={{borderBottom: '3px solid #ba8c63'}}> 
        <p>Active Coupons</p>
      </Link>
    </div>
    
    <div id='ord-list'>
 {!!isCoupons && isCoupons.map((cop) => {
  
  if(cop.userid !== user.userid){
      return !cop; 
    }
 
    return (
    <Link className='ord-nav'>
    <div className='ord-nav-nav'>
      <div className='row'>
      <h4>Congratulation! <br/> You have earned a coupon.</h4>
      </div>
      <div className='row'>
        <div></div>
        <div>
        <input type='button' className={cop.isActivated === "not activated" ? "btn_ords" : "no-crt"} id={cop.id} onClick={activateCoupon} value={'Activate Kes. ' + cop.coupon}/>
        <h5 className={cop.isActivated === "activated" ? "add-to-crts" : "no-crt"}>Activated</h5> 
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

export default Coupons
