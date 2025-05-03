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
import { Link, useNavigate } from 'react-router-dom'
import * as icons from 'react-bootstrap-icons'
import $ from 'jquery'
import back_ground from '../images/back_ground.png'
import AnotherFooter from './AnotherFooter';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CategoryDirectedPage = () => {
  const[isCat, setIsCat] = useState([])
  const {user} = useContext(UserContext)
  const [newPrdt, setNewPrdt] = useState([])
  const [searchedPrdt, setSearchedPrdt] = useState([])
  const navigate = useNavigate()
  const [isLoading , setIsLoading] = useState(true)

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

  const handleSearchs =(ev) => {
    $('#val-search').html(ev.target.value);
    const filt = !!newPrdt && newPrdt.filter(f => f.name.includes(ev.target.value))  
    setSearchedPrdt(filt);
  }

  const handleSearchBtn = () => {
    const searchElem = $('#search-val').val();
    $('#val-search').html(searchElem);
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

const viewMore = async (ev) => {    
  return navigate('/product/' + ev.target.id)
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
                 <Link key={ind} to={{pathname: '/category/' + cat.name}} className='cat-link' id={cat.name} >{cat.name}</Link>
               );
             })
           }
      </div>
     
      <div className='screen' id='scr'>  
      <div className='backgd-img'>
      {!!back_ground ? <img src={back_ground} alt='bg-img'/> : <Skeleton style={{width: "100%", height: "250px"}} /> }
      </div>
      <h4 className='mostvw'>Search result for : <span id='val-search'></span> </h4>
      <div className='prodiv'>
      {
        isLoading 
        &&
        <div className="prodiv" style={{display: 'flex', justifyContext: "center", flexWrap: "wrap"}}>
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
         {!!searchedPrdt && searchedPrdt.map((prdt) => {
          const sPrc = parseInt(prdt.sprice)
          return (
            <div className='prdt-div'>
              <img src={prdt.imeg} className='img' alt='_img'/>
              <span>{prdt.name}</span>
              <p style={{fontSize: '12px'}}>{sPrc.toLocaleString()} KES</p>
              <button className='add-to-cart' id={prdt.id} onClick={addToCart}>Add to Cart</button>
              <button className='add-to-cart' id={prdt.id} onClick={viewMore} style={{background: '#000'}}>Read more</button>
            </div>
          );
         })}
       </div>
       <hr/>
       <div className='prodiv'>
       {
        isLoading 
        &&
        <div className="prodiv" style={{display: 'flex', justifyContext: "center", flexWrap: "wrap"}}>
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
         {!!newPrdt && newPrdt.map((prdt) => {
          const sPrc = parseInt(prdt.sprice)
          return (
            <div className='prdt-div'>
              <img src={prdt.imeg} className='img' alt='_img'/>
              <span>{prdt.name}</span>
              <p style={{fontSize: '12px'}}>{sPrc.toLocaleString()} KES</p>
              <button className='add-to-cart' id={prdt.id} onClick={addToCart}>Add to Cart</button>
              <button className='add-to-cart' id={prdt.id} onClick={viewMore} style={{background: '#000'}}>Read more</button>
            </div>
          );
         })}
       </div>

       <AnotherFooter/>

       <div id='marg'></div>
      </div>
    </div>
  )
}

export default CategoryDirectedPage
