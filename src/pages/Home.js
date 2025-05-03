import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import TopProducts from './TopProducts'
import CategoriesAndOffers from './CategoriesAndOffers'
import PopularProducts from './PopularProducts'
import Products from './Products'
import { Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { addDoc, collection, doc, getDoc, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import SearchBar from './SearchBar'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
//import $ from 'jquery'
import * as Icon from 'react-bootstrap-icons'
import AnotherFooter from './AnotherFooter'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
  const {user} = useContext(UserContext)
  const [newPrdt, setNewPrdt] = useState([])
  const [popularPrdt, setPopularPrdt] = useState([])
  const location = useNavigate();
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
    return location('/product/' + ev.target.id)
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
            { 
              isLoading 
                &&
                <SwiperSlide>
                <div className='swiprslide'> 
                <div className='swiper1'>
                <br/>
                <br/>
                  <Skeleton style={{width: '300px', height: '50px'}}/>
                  <br/>
                  <Skeleton count={4} style={{width: '200px'}}/>
                </div>  
                <div className='swiper2'>
                 <Skeleton style={{width: "300px", height: "250px"}} />
                 <br/>
                 <Skeleton count={2} style={{width: '200px'}}/>
                 </div>
                </div>
                </SwiperSlide>
            }

            {newPrdt.length > 0
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
                {!!dt.imeg ? <img src={ dt.imeg } className='img-s' alt='img_src' id={dt.id}/> : <Skeleton style={{width: "300px", height: "250px"}} /> }
                <p>Price:</p>
                <p>KES. {sPrc.toLocaleString()}</p>
                </div>
                </div>
                </SwiperSlide>
              );
            })
            :
            <SwiperSlide>
                <div className='swiprslide'> 
                <div className='swiper1'>
                <br/>
                <br/>
                  <Skeleton style={{width: '300px', height: '50px'}}/>
                  <br/>
                  <Skeleton count={4} style={{width: '200px'}}/>
                </div>  
                <div className='swiper2'>
                 <Skeleton style={{width: "300px", height: "250px"}} />
                 <br/>
                 <Skeleton count={2} style={{width: '200px'}}/>
                 </div>
                </div>
                </SwiperSlide>
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

       <div className='prodiv'>
         {
          !!popularPrdt && popularPrdt.map((prdt) => {
          const sPrc = parseInt(prdt.sprice)
          return (
            <div className='prdt-div'>
              <img src={prdt.imeg} className='img' alt='_img'/>
              <span>{prdt.name}</span>
              <Icon.Heart className='fav' id={prdt.id} onClick={wishList}/>
              <p style={{fontSize: '12px'}}>{sPrc.toLocaleString()} KES</p>
              <button className='add-to-cart' id={prdt.id} onClick={addToCart}>Add to Cart</button>
              <button className='add-to-cart' id={prdt.id} onClick={viewMore} style={{background: '#000'}}>Read more</button>
            </div>
          )})
         }
       </div>
       <h4 className='mostvw'>Other products</h4>
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

export default Home
