import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LoginDirectory = ({children}) => {
    const navigate = useLocation();
    const [isLoc, setIsLoc] = useState(false);

    useEffect(() => {
        if(navigate.pathname === '/logg-in'){
            setIsLoc(true)
        }else if(navigate.pathname === '/'){
          setIsLoc(true)
        }else{
          setIsLoc(false)
        }
    }, [navigate])

  return (
    <>
      {isLoc && children}
    </>
  )
}

export default LoginDirectory
