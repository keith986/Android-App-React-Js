import React, {useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const FooterDirectory = ({children}) => {
    const location = useLocation();
    const [isLocs, setIsLocs] = useState(false);

    useEffect(() => {
        if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/' || location.pathname === '/admin' || location.pathname === '/allusers' || location.pathname === '/allcategories' || location.pathname === '/allproducts' || location.pathname === '/verify'){
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
