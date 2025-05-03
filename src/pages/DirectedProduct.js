import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import {Link, useNavigate, useParams } from 'react-router-dom'
import * as icons from 'react-bootstrap-icons'
import $ from 'jquery'
import back_ground from '../images/back_ground.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AnotherFooter from './AnotherFooter'

const DirectedProduct = () => {
  const {id} = useParams()
  const {user} = useContext(UserContext)
  const [newPrdt, setNewPrdt] = useState([])
  const [isCat, setIsCat] = useState([])
  const navigate = useNavigate()

 async function fetchNewProducts () {
      const colRef = doc(db, "products", id)
      const catSnap = await getDoc(colRef);

    if(catSnap.exists()){
      setNewPrdt(catSnap.data())
    }else{
        setNewPrdt([])
    }
 }

  useEffect(() => {
     fetchNewProducts()  
  })

  /*
  const handleSlideChange = () => {
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    if(randomColor.length !== 7){ 
      randomColor = handleSlideChange();
    }
    $('.swi-per').css('background', randomColor)
  }
  */

  const addToCart = async () => {
      const colRef = doc(db, "products", id);
      const docSnap = await getDoc(colRef);

      if(docSnap.exists()){
        await addDoc(collection(db, 'cart'), {
                      cartdata : docSnap.data(),
                      userid : !!user && user.userid
                    })
                    .then((res) => {
                      toast.success('added to cart')
                    })
                    .catch((err) => {
                      toast.error('Could not add to cart!')
                    })
      }else{
        console.log('No such document')
      }
  }


  const fetchCategories = async () => {
    const colRef = collection(db, "products")
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
  }, []);


const toggleCategory = () => {
  $('#myCateg').animate({
    width: 'toggle'
  })
}  

const handleSearchs = () => {
  navigate('/search')
}


  return (
    <div className='entr'>
     <Header/>
  
     <div className='container-fluid cls-this' id='header' style={{background:'gray'}}>
           <nav className='navbar' id='myNavbar'>
                 <div className='navbar-logo'>
                  <h2 className='logo'>
                    <icons.List className='cat-gos' onClick={toggleCategory}/> Categories
                  </h2>
                 </div>
                 <div className='searchbar' id='sachba'>
                  <input type='search' className='search' id='search-val' placeholder='Search ...' onChange={handleSearchs}/>
                 </div>
                 <div className='user-profile'>
                  <input type='submit' value='Search' className='sachcon' onClick={handleSearchs} style={{display: 'none'}}/>
                 </div>    
           </nav>
     </div>
     <div className='categ' id='myCateg'>
           {
             !!isCat && isCat.map((cat, ind) => {
               return (
                 <Link key={ind} to={{pathname: '/category/' + cat.name}} className='cat-link' id={cat.name} >{cat.name}</Link>
               );
             })
           }
      </div>
     
      <div className='screen' id='scr'>  
       <div className='backgd-img'>
       {!!back_ground ? <img src={back_ground} alt='bg-img'/> : <Skeleton style={{width: "100%", height: "250px"}} /> }
       </div>
       <hr/>
       <div className='prodiv'>
         {
          //const sPrc = parseInt(newPrdt.sprice)
          <div id='prdtdii'>
            <div className='prdt-di'>
              {!!newPrdt.imeg ? <img src={newPrdt.imeg} className='ismgs' alt='_img'/> : <Skeleton style={{width: "400px", height: "300px"}} /> }
              <div>
              <span style={{fontSize: "30px", fontWeight: "bold"}}>{newPrdt.name || <Skeleton style={{width: "200px", height: "20px"}} />}</span>
              <br/><br/>
              <h4>Description</h4>
              <i>{newPrdt.description || <Skeleton style={{width: "200px", height: "20px"}} /> }</i>
              <p style={{fontSize: '14px'}}>{newPrdt.sprice ? parseInt(newPrdt.sprice).toLocaleString() : 0.00} KES</p>
              <br/><br/>
              <button className='add-to-scart' onClick={addToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
         }
       </div>

       <AnotherFooter />

       <div id='marg'></div>
      </div>
    </div>
  )
}

export default DirectedProduct