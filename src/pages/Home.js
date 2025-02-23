import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import TopProducts from './TopProducts'
import CategoriesAndOffers from './CategoriesAndOffers'
import PopularProducts from './PopularProducts'
import Products from './Products'
import { Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading_icon from '../images/Loading_icon.gif'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { addDoc, collection, doc, getDoc, limit, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import SearchBar from './SearchBar'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
//import $ from 'jquery'
import * as Icon from 'react-bootstrap-icons'
import AnotherFooter from './AnotherFooter'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useContext(UserContext)
  const [newPrdt, setNewPrdt] = useState([])
  const [popularPrdt, setPopularPrdt] = useState([])
  const location = useNavigate();

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

  async function fetchPopularProducts () {
      const colRef = collection(db, "products")
      const qRef = query(colRef, orderBy("views", "desc"), limit(4));
      onSnapshot(qRef, (snapShot) => {
              let pro_ducts = [];
              snapShot.docs.forEach((snaps) => {
                 pro_ducts.push({...snaps.data(), id: snaps.id})
              })
          setPopularPrdt(pro_ducts);
      })
  }

  useEffect(() => {
        fetchNewProducts()  
        fetchPopularProducts()
  }, [])

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

  const viewMore = async (ev) => {
         await setDoc(doc(db, "productlink", user.userid), {
                                       userid : user.userid,
                                       prdid : ev.target.id
                                         })
                                        .then((docRef) => {
                                           location('/product/')
                                         })
                                        .catch((ers) => {
                                         toast.error('Internal server error!')
                                         })
  }

  const wishList = async (ev) => {
    const colRef = doc(db, "products", ev.target.id);
    const docSnap = await getDoc(colRef)
    const docData = [];

    if(docSnap.exists()){
      docData.push({...docSnap.data()})
    }

    await addDoc(collection(db, 'wishlist'), {
                userId : !!user && user.userid,
                product_name: docSnap.data().name,
                prod_imeg : docSnap.data().imeg,
                prod_Id: ev.target.id
                })
    .then((res) => {
      toast.success('added to wish List')
    })
    .catch((err) => {
      toast.error('Could not add to wish list!')
    })
  }

  return (
    <div className='entr'>
      <Header/>
      <SearchBar/> 
      <div className='screen' id='scr'>  
      <div className='swiper-cont'>
      <Swiper
       className='swi-per'
       modules={[Navigation, Pagination, Scrollbar, A11y]}
       spaceBetween={5}
       slidesPerView={1}
       navigation
       pagination={{ clickable: true }}
       //scrollbar={{ draggable: true}}
       //onSwiper={handleSlideChange}
       //onSlideChange={handleSlideChange}
    >
     <div className='row' id='row-top2'>
            {!!newPrdt && newPrdt.length > 0
            ?
            newPrdt.map((dt, ind) => {
              if(dt.new !== 'Yes'){
                   return !dt;
              }
              const sPrc = parseInt(dt.sprice)
              return (
                <SwiperSlide key={ind}>
                <div className='swiprslide' key={ind}>
                <div className='swiper1'>
                <h4>{dt.name}</h4>
                <p className='descr-swi'>{dt.description}</p>
                <Icon.Heart className='fav' id={dt.id} onClick={wishList}/>
                <button className='add-to-carts' id={dt.id} onClick={viewMore}>Read more</button>
                <button className='add-to-cart' id={dt.id} onClick={addToCart}>Add to Cart</button>
                </div>
                <div className='swiper2'>
                <img src={!!dt.imeg ? dt.imeg : Loading_icon} className='img-s' alt='img_src' id={dt.id}/>
                <p>Price:</p>
                <p>KES. {sPrc.toLocaleString()}</p>
                </div>
                </div>
                </SwiperSlide>
              );
            })
            :
            <img src={Loading_icon} className='img' alt='Loading_icon'/>
            }
     </div>
      </Swiper>
      </div>
      <div className='scn-dv'>
      <TopProducts/>
      </div>
      <div className='scn-dvss'>
      <CategoriesAndOffers/>      
      <div className='col-row' >
        <h4>Most Popular Products</h4>
      </div>
      <PopularProducts/>
      <div className='col-row' style={{background: '#fff'}}> 
        <h4>Now Available</h4>
      </div>
      <Products/>
      </div>
       <h4 className='mostvw'>Most viewed</h4>
       <div className='prodiv'>
         {!!popularPrdt && popularPrdt.map((prdt) => {
          const sPrc = parseInt(prdt.sprice)
          return (
            <div className='prdt-div'>
              <img src={prdt.imeg} className='img' alt='_img'/>
              <span>{prdt.name}</span>
              <Icon.Heart className='fav' id={prdt.id} onClick={wishList}/>
              <p style={{fontSize: '12px'}}>{sPrc.toLocaleString()} KES</p>
              <button className='add-to-cart' id={prdt.id} onClick={addToCart}>Add to Cart</button>
            </div>
          );
         })}
       </div>
       <h4 className='mostvw'>Other products</h4>
       <div className='prodiv'>
         {!!newPrdt && newPrdt.map((prdt) => {
          const sPrc = parseInt(prdt.sprice)
          return (
            <div className='prdt-div'>
              <img src={prdt.imeg} className='img' alt='_img'/>
              <span>{prdt.name}</span>
              <Icon.Heart className='fav' id={prdt.id} onClick={wishList}/>
              <p style={{fontSize: '12px'}}>{sPrc.toLocaleString()} KES</p>
              <button className='add-to-cart' id={prdt.id} onClick={addToCart}>Add to Cart</button>
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

export default Home
