import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import Loading_icon from '../images/Loading_icon.gif'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import * as icons from 'react-bootstrap-icons'
import {UserContext} from '../context/UserContext'

const Products = () => {
  const {user} = useContext(UserContext)
  const [Prdt, setPrdt] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [viewPrdt, setViewPrdt] = useState([])

  async function fetchProducts () {
    const colRef = collection(db, "products")
    onSnapshot(colRef, (snapShot) => {
            let pro_ducts = [];
            snapShot.docs.forEach((snaps) => {
               pro_ducts.push({...snaps.data(), id: snaps.id})
            })
        setPrdt(pro_ducts);
    })
  }

  useEffect(() => {
      fetchProducts()  
  }, [])

const addToCart = async (e) => {
    const colRef = doc(db, "products", e.target.id);
    const docSnap = await getDoc(colRef);

    await addDoc(collection(db, 'cart'), {
                  cartdata : docSnap.data(),
                  userid: !!user && user.userid
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
    setIsModal(true)
  }
}

const handleCloseModal = () => {
  setIsModal(false)
}

  return (
    <div>
    
    <div className={isModal ? 'open-modal' : 'close-modal'}>
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

      <div className='container-rowss'>
      {!!Prdt && Prdt.length > 0
      ?
       Prdt.map((dt) => {
          return (
            <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={!!dt.imeg ? dt.imeg : Loading_icon} className='img' alt='img_src' id={dt.id} onClick={handleViewProduct}/>
            <h4>{dt.name}</h4>
            <p>{dt.sprice} KES</p>
            <button className='add-to-cart' id={dt.id} onClick={addToCart}>Add to Cart</button>
            </div>
          );
      })
      :
      <img src={Loading_icon} className='img' alt='Loading_icon'/>
      }
      </div>

    </div>
  )
}

export default Products
