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
import CategoryDirectedPage from './pages/CategoryDirectedPage.js'
import DirectedPage from './pages/DirectedPage';
import DirectedProduct from './pages/DirectedProduct';
import AboutPage from './pages/AboutPage.js';
import ContactUsPage from './pages/ContactUsPage.js';
import FAQSPage from './pages/FAQSPage.js';
import TermsAndConditions from './pages/TermsAndCondtions.js';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import { HashLoader } from "react-spinners";

//connect to backend
Axios.defaults.baseURL = 'http://localhost:7000/';
Axios.defaults.withCredentials = true;

function App() {
  const [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    minHeight: "100vh"
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 8000)
  }, []);

  return (
    <UserContextProvider> 
    {loading ? 
      <HashLoader
        color={"rgb(125, 12, 120)"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    : 

      <div className='screen'>
      <ToastContainer 
        position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme = "light"
          zIndex ='500000'
      />
      <ToastContainer />

      <LoginDirectory>
      <Login path='/logg-in'/>
      </LoginDirectory>

      <SignupDirectory>
        <Signup path='/signup'/>
      </SignupDirectory>

      <AdminBarDirectory>
        <AdminBar/>
      </AdminBarDirectory>

      <SkeletonTheme baseColor="gray" highlightColor="silver">
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
        <Route element={<CategoryDirectedPage/>} path='/search'/>
        <Route element={<DirectedPage/>} path='/category/:name'/>
        <Route element={<DirectedProduct/>} path='/product/:id'/>
        <Route element={<AboutPage/>} path='/about'/>
        <Route element={<ContactUsPage/>} path="/support"/>
        <Route element={<FAQSPage/>} path="/FAQs"/>
        <Route element={<TermsAndConditions/>} path="/terms-and-conditions"/>
      </Routes>  
      </SkeletonTheme>

      <FooterDirectory>
       <Footer/>
      </FooterDirectory>
      </div> 
   
    }
    </UserContextProvider>
  );
}

export default App;
