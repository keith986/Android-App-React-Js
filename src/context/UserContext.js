import { createContext, useEffect, useState } from 'react';
import {onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
//import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) { 
            onAuthStateChanged(auth, async (userdata) => {
                if (userdata) {
                  // User is signed in
                  const userid = userdata.uid;
                  const colRef = doc(db, "customers", userid);
                  const docSnap = await getDoc(colRef);
                  
                  if(docSnap.exists()){
                    setUser(docSnap.data());
                  }else{
                    console.log('doesnt exist')               
                  }
                  
                } else {
                 //User Log out
                 navigate('/logg-in')
                 console.log('Logged out')
                }
            });
        }
    }, [user, navigate])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
           );
}
