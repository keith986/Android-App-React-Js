import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc,} from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { Link, useLocation } from 'react-router-dom'
import * as icons from 'react-bootstrap-icons'
import $ from 'jquery'
import back_ground from '../images/back_ground.png'
import Loading_icon from '../images/Loading_icon.gif'

const DirectedPage = () => {
  const[isCat, setIsCat] = useState([])
  const {user} = useContext(UserContext)
  const [newPrdt, setNewPrdt] = useState([])
  const [searchedPrdt, setSearchedPrdt] = useState([])
  const location = useLocation();
  const [myCat, setMyCat] = useState([])
  
  async function fetchNewProducts () {
      const colRef = collection(db, "products")
      await onSnapshot(colRef, (snapShot) => {
              let pro_ducts = [];
              snapShot.docs.forEach((snaps) => {
                 pro_ducts.push({...snaps.data(), id: snaps.id})
              })
          setNewPrdt(pro_ducts);
      })
  }

  const fetchCategoryList = async () => {
    const catRef = doc(db, "catlink", user.userid);
    const catSnap = await getDoc(catRef);

    if(catSnap.exists()){
      setMyCat(catSnap.data().catlink)
    }else{
      location('/dashboard')
    }
  }

  useEffect(() => {
    fetchCategoryList();
  })

  const handleSearchs =(ev) => {
    if(ev.target.value === ''){
      $('#searchres').html('Let us help you search for what you looking for');
    }else{
      $('#searchres').html(ev.target.value);
    }
    const filt = !!newPrdt && newPrdt.filter(f => f.name.includes(ev.target.value));  
    setSearchedPrdt(filt);
  }

  const handleSearchBtn = () => {
    const searchElem = $('#search-val').val();
    if(searchElem === ''){
      $('#searchres').html('Let us help you search for what you looking for');
    }else{
    $('#searchres').html(searchElem);
    }
    const filt = !!newPrdt && newPrdt.filter(f => f.name.includes(searchElem))  
    setSearchedPrdt(filt);
  }

  useEffect(() => {
     fetchNewProducts()  
  },[])

  /*
  const handleSlideChange = () => {
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    if(randomColor.length !== 7){ 
      randomColor = handleSlideChange();
    }
    $('.swi-per').css('background', randomColor)
  }
  */

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
                      toast.error('Could not add to cart!')
                    })
  }

  const currentYear = () => {
    const da_te = new Date()
    const curr_yr = da_te.getFullYear();
    return curr_yr;
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
  }, [searchedPrdt]);

const toggleCategory = () => {
  $('#myCateg').animate({
    width: 'toggle'
  })
}  

async function handleLink(e) {
   await setDoc(doc(db, "catlink", user.userid), {
                                 userid : user.userid,
                                 catlink : e.target.id
                                   })
                                  .then((docRef) => {
                                     console.log('Category Found!!')
                                   })
                                  .catch((ers) => {
                                   toast.error('Internal server error!')
                                   })
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
                  <input type='submit' value='Search' className='sachcon' onClick={handleSearchBtn}/>
                 </div>    
           </nav>
     </div>
      <div className='categ' id='myCateg'>
           {
             !!isCat && isCat.map((cat, ind) => {
               return (
                 <Link key={ind} to={'/category/list'} className='cat-link' id={cat.name} onClick={handleLink}>{cat.name}</Link>
               );
             })
           }
     </div>
     
      <div className='screen' id='scr'>  
      <div className='backgd-img'>
        <img src={!!back_ground ? back_ground : Loading_icon} alt='bg-img'/>
      </div>
       <h4 className='mostvw'>{myCat}</h4>
       <span id='searchres'>Let us help you search for what you looking for</span>
       <div className='prodiv'>
         {!!searchedPrdt && searchedPrdt.map((prdt) => {
          if (prdt.cat !== myCat){
             return !prdt;
          }
          const sPrc = parseInt(prdt.sprice)
          return (
            <div className='prdt-div'>
              <img src={prdt.imeg} className='img' alt='_img'/>
              <span>{prdt.name}</span>
              <p style={{fontSize: '12px'}}>{sPrc.toLocaleString()} KES</p>
              <button className='add-to-cart' id={prdt.id} onClick={addToCart}>Add to Cart</button>
            </div>
          );
         })}
       </div>
       <hr/>
       <div className='prodiv'>
         {!!newPrdt && newPrdt.map((prdt) => {
          if (prdt.cat !== myCat){
             return !prdt;
          }
          const sPrc = parseInt(prdt.sprice)
          return (
            <div className='prdt-div'>
              <img src={prdt.imeg} className='img' alt='_img'/>
              <span>{prdt.name}</span>
              <p style={{fontSize: '12px'}}>{sPrc.toLocaleString()} KES</p>
              <button className='add-to-cart' id={prdt.id} onClick={addToCart}>Add to Cart</button>
            </div>
          );
         })}
       </div>

       <Link to='' style={{color:'red', display: 'flex', justifyContent: 'center'}}>&copy; Copyright {currentYear()}</Link>

       <div id='marg'></div>
      </div>
    </div>
  )
}

export default DirectedPage