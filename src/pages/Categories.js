import React, { useContext, useEffect, useState } from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import Loading_icon from '../images/Loading_icon.gif'
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import {UserContext} from '../context/UserContext'

const Categories = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [isCat, setIsCat] = useState([])
    const [Prdt, setPrdt] = useState([])
    const [catId, setCatId] = useState('') 
    const [isModals, setIsModals] = useState(false)
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

    const handleClick = async () => {
        $('.container-row').animate({
            width: 'toggle'
        }, 100);
        setTimeout(() => {
        navigate('/');
        }, 500)
    } 

    const handleModal =  async(e) => {
      if(e.target.id !== ''){
      setCatId(e.target.id)
      setIsModal(true);
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
      }
    }

    const closeModal =  async() => {
      setIsModal(false)
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
    }

    const fetchCategories = async () => {
      const colRef = collection(db, "categories")
      await onSnapshot(colRef, (snapShot) => {
              let products_cat = [];
              snapShot.docs.forEach((snaps) => {
                 products_cat.push({...snaps.data(), id: snaps.id})
              })
          setIsCat(products_cat);
      })
    }

    useEffect( () => {
      fetchCategories();
      fetchProducts();
    }, []);

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
    <div id='categories'>
     <div className='back-bg'>
    <Link  onClick={handleClick}>
      <icons.ChevronRight className='back'/>
    </Link>
     </div>
 
    <div className={isModals ? 'open-modal' : 'close-modal'} style={{zIndex: '10000'}}>
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
        if(dt.cat !== catId){
          return !dt;
        }
        const sPrc = parseInt(dt.sprice)
          return (
            <div className='row-cols' style={{background: '#fff', borderRadius: '10px'}}>
            <img src={!!dt.imeg ? dt.imeg : Loading_icon} className='img' alt='img_src' id={dt.id} onClick={handleViewProduct}/>
            <h4>{dt.name}</h4>
            <p>{sPrc.toLocaleString()} KES</p>
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
     {
      !!isCat && isCat.length > 0
       ? 
      isCat.map((cat) => {
          return (
            <Link className='row-colss' onClick={handleModal} id={cat.name}>
                <h3 id={cat.name}>{cat.name}</h3>
                <icons.ColumnsGap className='rw-icon' id={cat.name}/>
            </Link>
          );
      })
       :
      <img src={Loading_icon} className='img' alt='Loading_icon'/>
      }
     </div>

    </div>
  )
}

export default Categories