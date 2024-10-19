import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SignupDirectory = ({children}) => {

    const navigate = useLocation();
    const [isLoc, setIsLoc] = useState(true);

    useEffect(() => {
        if(navigate.pathname !== '/signup'){
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

export default SignupDirectory
   