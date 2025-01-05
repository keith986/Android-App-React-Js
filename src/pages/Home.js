import React from 'react'
import Header from './Header'
import TopProducts from './TopProducts'
import CategoriesAndOffers from './CategoriesAndOffers'
import PopularProducts from './PopularProducts'
import Products from './Products'

const Home = () => {
  return (
    <>
     <Header/>
      <div className='screen'>
      <div className='scn-dv'>
      <TopProducts/>
      </div>
      <CategoriesAndOffers/> 
      <div className='col-row' >
        <h4>Most Popular Products</h4>
      </div>
      <PopularProducts/>
      <div className='col-row' style={{background: '#fff'}}> 
        <h4>Now Available</h4>
      </div>
      <Products/>
      <div className='col-row'><span style={{marginTop: '50px', marginBottom: '20px'}}></span></div>
      </div> 
    </>
  )
}

export default Home
