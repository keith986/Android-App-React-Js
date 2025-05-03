import React, { useContext, useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc, onSnapshot,} from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import * as icons from 'react-bootstrap-icons'
import Loading_icon from '../images/Loading_icon.gif'
import {UserContext} from '../context/UserContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TopProducts = () => {
  const {user} = useContext(UserContext)
  const [newPrdt, setNewPrdt] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [viewPrdt, setViewPrdt] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchNewProducts () {
    const colRef = collection(db, "products")
    await onSnapshot(colRef, (snapShot) => {
            let pro_ducts = [];
            snapShot.docs.forEach((snaps) => {
               pro_ducts.push({...snaps.data(), id: snaps.id})
            })
        setNewPrdt(pro_ducts);
        setIsLoading(false)
    })
  }

  useEffect(() => {
      fetchNewProducts()  
  }, [])

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
    setIsModal(true)
    }
  }

  const handleCloseModal = () => {
    setIsModal(false)
  }

  return (
    <div className='container-fluid'>
    
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

    <div className='row' id='row-top2'>
          {
            isLoading 
            &&
            <div className="prodiv" style={{display: 'flex', justifyContext: "center", flexDirection: "row"}}>
              <div style={{margin: "5px"}}>
              <Skeleton style={{width: "200px", height: "150px"}} />
              <Skeleton count={2} style={{width: '200px'}} />
              <Skeleton count={2} style={{width: '200px', paddingTop: "20px"}} />
              </div>
              <div style={{margin: "5px"}}>
              <Skeleton style={{width: "200px", height: "150px"}} />
              <Skeleton count={2} style={{width: '200px'}} />
              <Skeleton count={2} style={{width: '200px', paddingTop: "20px"}} />
              </div>
              <div style={{margin: "5px"}}>
              <Skeleton style={{width: "200px", height: "150px"}} />
              <Skeleton count={2} style={{width: '200px'}} />
              <Skeleton count={2} style={{width: '200px', paddingTop: "20px"}} />
              </div>
            </div>
          }
        {
         newPrdt.map((dt) => {
          if(dt.new !== 'Yes'){
               return !dt;
          }
          const sPrc = parseInt(dt.sprice)
          return (
            <div className='row-col'>
            <img src={!!dt.imeg ? dt.imeg : Loading_icon} className='img' alt='img_src' id={dt.id} onClick={handleViewProduct}/>
            <h4>{dt.name}</h4>
            <p>{sPrc.toLocaleString()} KES <span id='badge'>new</span></p>
            <button className='add-to-cart' id={dt.id} onClick={addToCart}>Add to Cart</button>
            </div>
          );
        })
        }
    </div>
  
    </div>
  )
}

export default TopProducts
