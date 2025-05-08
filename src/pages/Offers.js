import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as icons from 'react-bootstrap-icons'
import $ from 'jquery'
import Loading_icon from '../images/Loading_icon.gif'
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import {UserContext} from '../context/UserContext'

const Offers = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate();

    const [isModal, setIsModal] = useState(false);
    const [Prdt, setPrdt] = useState([])
    const [isModals, setIsModals] = useState(false)
    const [viewPrdt, setViewPrdt] = useState([])

    const handleClick = async () => {
        $('.container-row').animate({
            width: 'toggle'
        }, 100);

        setTimeout(() => {
         navigate('/dashboard');
        }, 500)
    }  

    const handleModal =  async() => {
      setIsModal(true)
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
    }

    const closeModal =  async() => {
      setIsModal(false)
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
    }

    async function fetchProducts () {
      const colRef = collection(db, "products")
      await onSnapshot(colRef, (snapShot) => {
              let pro_ducts = [];
              snapShot.docs.forEach((snaps) => {
                 pro_ducts.push({...snaps.data(), id: snaps.id})
              })
          setPrdt(pro_ducts);
      })
    }

    useEffect(() => {
      fetchProducts();
    },[])

  const addToCart = async (e) => {
    const colRef = doc(db, "products", e.target.id);
    const docSnap = await getDoc(colRef);

      await addDoc(collection(db, 'cart'), {
                    cartdata : docSnap.data(),
                    userid : !!user && user.userid
                  })
                  .then((res) => {
                    toast.success('added to cart')
                  })
                  .catch((err) => {
                    toast.error('Could not add to cart')
                  })
  }
  
  async function handleViewProduct(ev) {
    const colRef = doc(db, "products", ev.target.id);
    const docSnap = await getDoc(colRef);
    if(docSnap.exists()){
      setViewPrdt({...docSnap.data(), id : ev.target.id});
      setIsModals(true)
    }
  }
  
  const handleCloseModal = () => {
    setIsModals(false)
  }

  return (
    <div id='offers'>
    <div className='back-bg'>
    <Link  onClick={handleClick}>
      <icons.ChevronRight className='back'/>
    </Link>
    </div>
    
    <div className={isModals ? 'open-modal' : 'close-modal'} style={{zIndex: '30000'}}>
    <div className='modal-content'>
          <div className='back-bg'>
            <Link onClick={handleCloseModal}>
             <icons.ChevronRight className='back'/>
            </Link> 
          </div>
          <div className='modal-body'>
          <div className='modal-header'>
          <h1>{viewPrdt.name}</h1>
            <img src={!!viewPrdt ? viewPrdt.imeg : Loading_icon} alt='alt_product' id='alimgs'/>
            </div>  
            <p>{viewPrdt.description}</p>
            <span style={{margin: '20px'}}></span> 
          </div>
          <div className='modal-footer'>
          <button type='submit'  className='mod-btn' id={viewPrdt.id} onClick={addToCart}>Add to cart</button>
          </div>
    </div>
    </div>

    <h3 className='header-offers'><icons.LightningChargeFill className='offer-icon'/> Flash Sales and Offers</h3>

    <div className={isModal ? 'open-modal' : 'close-modal'} id='myModal'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div>
      <div className='modal-body'>
      {!!Prdt && Prdt.length > 0
      ?
       Prdt.map((dt) => {
        if(dt.offer !== 'Yes'){
          return !dt;
        }

        var disc = Math.floor(dt.discount * dt.sprice / 100);
        var sum = parseFloat(disc + parseInt(dt.sprice))
        const sPrc = parseInt(dt.sprice)
          return (
            <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={!!dt.imeg ? dt.imeg : Loading_icon} className='img' alt='img_src' id={dt.id} onClick={handleViewProduct}/>
            <h4>{dt.name}</h4>
            <p>{sPrc.toLocaleString()} KES <sup style={{color: 'red'}}><del>{sum}</del></sup></p>
            <button className='add-to-cart' id={dt.id} onClick={addToCart}>Add to Cart</button>
            </div>
          );
      })
      :
      <img src={Loading_icon} className='img' alt='Loading_icon'/>
      }
      </div>
    </div>

     <div className='container-row' style={{marginTop: '10%'}}> 
        <div className='row-colssss'>
        <div>
        <h3>Days</h3>
        <span className='rw-icon'>0</span> 
        </div>
        <div>
        <h3>Hours</h3>
        <span className='rw-icon'>0</span>
        </div>
        <div>
        <h3>Mins</h3>
        <span className='rw-icon'>0</span>
        </div>
        <div>
        <h3>Secs</h3>
        <span className='rw-icon'>0</span>
        </div>
        </div>
        <Link className='row-colsss' onClick={handleModal}>
        <h3>Just for you</h3>
        <icons.LightningChargeFill className='rw-icons' style={{color: 'rgb(237, 202, 4)'}}/> 
        </Link>
     </div>

    </div>
  )
}

export default Offers
