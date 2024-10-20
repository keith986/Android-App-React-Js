import { Route, Routes } from 'react-router-dom';
import Footer from './pages/Footer.js';
import './index.css'
import Categories from './pages/Categories.js';
import Home from './pages/Home.js';
import Offers from './pages/Offers.js';
import Cart from './pages/Cart.js'
import User from './pages/User.js';
import Orders from './pages/Orders.js';
import Coupons from './pages/Coupons.js';
import HelpAndSupport from './pages/HelpAndSupport.js';
import ProductQuery from './pages/ProductQuery.js';
import Suggestions from './pages/Suggestions.js';
import Notifications from './pages/Notifications.js';
import Settings from './pages/Settings.js';
import Login from './pages/Logins.js';
import LoginDirectory from './components/LoginDirectory/LoginDirectory.js';
import FooterDirectory from './components/FooterDirectory/FooterDirectory.js';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupDirectory from './components/SignupDirectory/SignupDirectory.js';
import Signup from './pages/Signup.js';
import AdminDashboard from './pages/AdminDashboard.js';

function App() {
  return (
    <>
      <div className='screen'>
      <ToastContainer
        position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme = "light"
      />
      <ToastContainer />

      <LoginDirectory>
      <Login path='/login'/>
      </LoginDirectory>

      <SignupDirectory>
        <Signup path='/signup'/>
      </SignupDirectory>

      <Routes>
        <Route element={<Home/>} path='/dashboard'/>
        <Route element={<AdminDashboard/>} path='/admin' />
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
        <Route element={<Settings/>} path='/settings'/>
      </Routes>
      <div className='col-row'><span style={{marginTop: '50px', marginBottom: '20px'}}></span></div>
      </div>
      <FooterDirectory>
      <Footer/>
      </FooterDirectory>
    </>
  );
}

export default App;
