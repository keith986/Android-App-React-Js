import React, {useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const FooterDirectory = ({Children}) => {
    const location = useLocation();
    const [isLoc, setIsLoc] = useState(true);

    useEffect(() => {
        if(location.pathname !== '/login' && location.pathname !== '/signup'){
            setIsLoc(true)
        }else{
            setIsLoc(false)
        }

    }, [location])

  return (
    <>
      {isLoc && Children}
    </>
  )
}

export default FooterDirectory
