import React, {useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const FooterDirectory = ({Children}) => {
    const location = useLocation();
    const [isLocs, setIsLocs] = useState(false);

    useEffect(() => {
        if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/'){
            setIsLocs(false)
        }else{
            setIsLocs(true)
        }

    }, [location])

  return (
    <>
      {isLocs && Children}
    </>
  )
}

export default FooterDirectory
