import React, {useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
//import $ from 'jquery'

const FooterDirectory = ({children}) => {
    const location = useLocation();
    const [isLocs, setIsLocs] = useState(false);

    useEffect(() => {
      if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/' || location.pathname === '/allorders' || location.pathname === '/admin' || location.pathname === '/allusers' || location.pathname === '/allcategories' || location.pathname === '/allproducts' || location.pathname === '/verify' || location.pathname === '/allcategories' || location.pathname === '/allproducts' || location.pathname === '/cart' || location.pathname === '/categories'){
            setIsLocs(false)
        }else{
            setIsLocs(true)
        }
    }, [location])

  return (
    <>
      {isLocs && children}
    </>
  )
}

export default FooterDirectory
