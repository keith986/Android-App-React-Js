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
import Axios from 'axios'
import { UserContextProvider } from './context/UserContext.js';
import AdminBar from './pages/AdminBar.js';
import AdminBarDirectory from './components/AdminBarDirectory/AdminBarDirectory.js';
import AdminDashboard from './pages/AdminDashboard.js';
import AllUsers from './pages/AllUsers.js';
import AllProducts from './pages/AllProducts.js';
import AllCategories from './pages/AllCategories.js';
import AllOrders from './pages/AllOrders.js';

//connect to backend
Axios.defaults.baseURL = 'http://localhost:7000/';
Axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider> 
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

      <AdminBarDirectory>
        <AdminBar/>
      </AdminBarDirectory>

      <Routes>
        <Route element={<Home/>} path='/dashboard'/>
        <Route element={<AdminDashboard/>} path='/admin'/>
        <Route element={<AllUsers/>} path='/allusers'/>
        <Route element={<AllProducts/>} path='/allproducts'/>
        <Route element={<Categories/>} path='/categories'/>
        <Route element={<AllCategories/>} path='/allcategories'/>
        <Route element={<AllOrders/>} path='/allorders'/>
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

    </UserContextProvider>
  );
}

export default App;
