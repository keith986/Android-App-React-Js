import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { addDoc, collection, doc, getDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as icons from 'react-bootstrap-icons'
import $ from 'jquery'
import back_ground from '../images/back_ground.png'
import Loading_icon from '../images/Loading_icon.gif'

const DirectedProduct = () => {
  const {user} = useContext(UserContext)
  const [newPrdt, setNewPrdt] = useState([])
  const location = useLocation();
  const [myCat, setMyCat] = useState([])
  const navigate = useNavigate()


  const fetchProductList = async () => {
    const catRef = doc(db, "productlink", user.userid);
    const catSnap = await getDoc(catRef);

    if(catSnap.exists()){
      setMyCat(catSnap.data().prdid)
      console.log(myCat)
    }else{
      location('/dashboard')
    }
  }

  useEffect(() => {
    fetchProductList();
  });


 async function fetchNewProducts () {
      const colRef = doc(db, "products", myCat.toString())
      const catSnap = await getDoc(colRef);

    if(catSnap.exists()){
      setNewPrdt(catSnap.data())
      console.log(catSnap.data())
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
    //console.log(eve.target.id)
      const colRef = doc(db, "products", myCat.toString());
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

  const currentYear = () => {
    const da_te = new Date()
    const curr_yr = da_te.getFullYear();
    return curr_yr;
  }

/*
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
  }, [searchedPrdt]);
*/

const toggleCategory = () => {
  $('#myCateg').animate({
    width: 'toggle'
  })
}  

const handleSearchs = () =>{
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
     
      <div className='screen' id='scr'>  
       <div className='backgd-img'>
        <img src={!!back_ground ? back_ground : Loading_icon} alt='bg-img'/>
       </div>
       <hr/>
       <div className='prodiv'>
         {
          //const sPrc = parseInt(newPrdt.sprice)
          <div id='prdtdii'>
            <div className='prdt-di'>
              <img src={newPrdt.imeg} className='ismgs' alt='_img'/>
              <div>
              <span>{newPrdt.name}</span>
              <br/><br/>
              <h5>Description</h5>
              <i>{newPrdt.description}</i>
              <p style={{fontSize: '12px'}}>{parseInt(newPrdt.sprice).toLocaleString()} KES</p>
              <br/><br/>
              <button className='add-to-scart' onClick={addToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
         }
       </div>

       <Link to='' style={{color:'red', display: 'flex', justifyContent: 'center'}}>&copy; Copyright {currentYear()}</Link>

       <div id='marg'></div>
      </div>
    </div>
  )
}

export default DirectedProduct