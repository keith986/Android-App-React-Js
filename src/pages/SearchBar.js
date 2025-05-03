import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import * as icons from 'react-bootstrap-icons'
import { db } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'

const SearchBar = () => {
  
  const [isCat, setIsCat] = useState([])
  const navigate = useNavigate();
    const fetchCategories = async () => {
        const colRef = collection(db, "categories")
        await onSnapshot(colRef, (snapShot) => {
                let products_cat = [];
                snapShot.docs.forEach((snaps) => {
                   products_cat.push({...snaps.data(), id: snaps.id})
                })
            setIsCat(products_cat);
        })
      }
  
      useEffect( () => {
        fetchCategories();
      }, []);
    
    const toggleCategory = () => {
      $('#myCateg').animate({
        width: 'toggle'
      })
    }  
 
    const handleSearch = (e) =>{
      navigate('/search')
    }

  return (
    <>
    <div className='container-fluid cls-this' id='header' style={{background:'gray'}}>
       <nav className='navbar' id='myNavbar'>
             <div className='navbar-logo'>
              <h2 className='logo'>
                <icons.List className='cat-gos' onClick={toggleCategory}/> Categories
              </h2>
             </div>
             <div className='searchbar' id='sachba'>
              <input type='search' className='search' placeholder='Search ...' onChange={handleSearch}/>
             </div>
             <div className='user-profile'>
              <input type='submit' value='Search' className='sachcon'/>
             </div>    
       </nav> 
    </div>
    <div className='categ' id='myCateg'>
      {
        !!isCat && isCat.map((cat, ind) => {
          return (
            <Link key={ind} to={'/category/' + cat.name } className='cat-link'>{cat.name}</Link>
          );
        })
      }
    </div>
    </>
  )
}

export default SearchBar
