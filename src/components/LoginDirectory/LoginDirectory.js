import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LoginDirectory = ({children}) => {
    const navigate = useLocation();
    const [isLoc, setIsLoc] = useState(true);

    useEffect(() => {
        if(navigate.pathname !== '/login'){
            setIsLoc(false)
        }else{
          setIsLoc(true)
        }
    }, [navigate])

  return (
    <>
      {isLoc && children}
    </>
  )
}

export default LoginDirectory
