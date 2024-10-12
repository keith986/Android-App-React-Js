import { Route, Routes } from 'react-router-dom';
import Footer from './Footer.js';
import './index.css'
import Categories from './Categories.js';
import Home from './Home.js';
import Offers from './Offers.js';
import Cart from './Cart.js'
import User from './User.js';
import Orders from './Orders.js';
import Coupons from './Coupons.js';
import HelpAndSupport from './HelpAndSupport.js';
import ProductQuery from './ProductQuery.js';
import Suggestions from './Suggestions.js';
import Notifications from './Notifications.js';

function App() {
  return (
    <>
      <div className='screen'>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Categories/>} path='/categories'/>
        <Route element={<Offers/>} path='/offers'/>
        <Route element={<Cart/>} path='/cart'/>
        <Route element={<User/>} path='/user'/>
        <Route element={<Orders/>} path='/orders'/>
        <Route element={<Coupons/>} path='/coupons'/>
        <Route element={<HelpAndSupport/>} path='/help'/>
        <Route element={<ProductQuery/>} path='/productquery'/>
        <Route element={<Suggestions/>} path='/suggestions'/>
        <Route element={<Notifications/>} path='/notifications'/>
      </Routes>
      <div className='col-row'><span style={{marginTop: '50px', marginBottom: '20px'}}></span></div>
      </div>
      <Footer/>
      
    </>
  );
}

export default App;
