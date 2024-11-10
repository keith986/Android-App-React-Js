import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const AdminBarDirectory = ({children}) => {
    const location = useLocation();
    const [isBar, setIsBar] = useState(false)

    useEffect(() => {
        if(location.pathname === '/admin' || location.pathname === '/allusers' || location.pathname === '/allproducts' || location.pathname === '/allorders' || location.pathname === '/alldelivery' || location.pathname === '/adminsettings' || location.pathname === '/allcategories'){
            setIsBar(true)
        }else{
            setIsBar(false)
        }
    }, [location])

  return (
    <>
      {isBar && children}
    </>
  )
}

export default AdminBarDirectory
