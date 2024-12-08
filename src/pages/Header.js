import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import Loading_icon from '../images/empty.png'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'

const Header = () => {
  const [isModal, setIsModal] = useState(false)
  const [isProducts, setIsProducts] = useState([])
  const [filterData, setIsFilterData] = useState([])
  const [isModals, setIsModals] = useState(false)
  const [viewPrdt, setViewPrdt] = useState([])
  const {user} = useContext(UserContext)

  const fetchProducts = async() => {
    const colRef = collection(db, 'products')
    await onSnapshot(colRef, (snapShot) => {
         const Prod = [];
         snapShot.docs.forEach((snap) => {
          Prod.push({...snap.data(), id: snap.id})
         })
         setIsProducts(Prod)
    })
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const handleChange = () => {
    setIsModal(true)
  }

  const handleCloseModal = () => {
    setIsModal(false) 
  }

  const handleCloseModals = () => {
    setIsModals(false) 
  }

  const handleChangeProduct = async (ev) => {
    const filt = !!isProducts && isProducts.filter(f => f.name.includes(ev.target.value))  
    setIsFilterData(filt);
  }

  async function handleViewProduct(ev) {
    const colRef = doc(db, "products", ev.target.id);
    const docSnap = await getDoc(colRef);
    if(docSnap.exists()){
    setViewPrdt({...docSnap.data(), id : ev.target.id});
    setIsModals(true)
    }
  }
  
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

  return (
    <div className='container-fluid' id='header'>
    <nav className='navbar' id='myNavbar'>
       <div className='navbar-logo'>
        <h2 className='logo'>ONLINESTORE</h2>
       </div>
       <div className='searchbar'>
        <input type='search' className='search' placeholder='Search ...' onClick={handleChange}/>
        <icons.Search className='search-icon'/>
       </div>
       <div className='user-profile'>
        <icons.PersonCircle className='user-icon'/>
       </div>    
    </nav>
    <div className={isModal ? 'open-modal' : 'close-modal'}>
    <div className='modal-content'>
          <div className='back-bg'>
            <Link onClick={handleCloseModal}>
             <icons.ChevronRight className='back'/>
            </Link> 
          <div className='searchbar'>
           <input type='search' className='search' placeholder='Search by product name...' onInput={handleChangeProduct}/>
          </div>
          </div>
          <div className='modal-body'>
            {!!filterData && filterData.map((filt) => {
              const sPrc = parseInt(filt.sprice)
              return (
                <Link className='ord-nav' id='fil'>
                   <div className='ord-nav-nav'>
                    <div className='row'>
                     <h4>{filt.name}</h4>
                     <code>KES</code>
                    </div>
                    <div className='row'>
                    <div>
                    <img src={!!filt.imeg ? filt.imeg : Loading_icon} className='cart_img' alt='img_src'/>
                    </div>
                    <div id='prc-loc'>{sPrc.toLocaleString()}</div>
                    </div>
                    <br/>
                    <input type='button' className='btn_ords' id={filt.id} onClick={handleViewProduct} value='View Product'/>
                   </div>
                </Link>
              );
            })}
          </div>
    </div>
    </div>
    <div className={isModals ? 'open-modal' : 'close-modal'}>
    <div className='modal-content'>
          <div className='back-bg'>
            <Link onClick={handleCloseModals}>
             <icons.ChevronRight className='back'/>
            </Link> 
          </div>
          <div className='modal-body'>
          <div className='modal-header'>
           <h1>{viewPrdt.name}</h1>
            <img src={!!viewPrdt ? viewPrdt.imeg : Loading_icon} alt='alt_product' id='alimgs'/>
            </div>  
            <p id='descr'>{viewPrdt.description}</p>
            <span style={{margin: '20px'}}></span> 
          </div>
          <div className='modal-footer'>
          <button type='submit'  className='mod-btn' id={viewPrdt.id} onClick={addToCart}>Add to cart</button>
          </div>
    </div>
    </div>
    </div>
  )
}

export default Header
