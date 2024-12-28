import { addDoc, collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { UserContext } from '../context/UserContext'
import * as icons from 'react-bootstrap-icons'
import $ from 'jquery'
import { toast } from 'react-toastify'

const AllCategories = () => {
    const {user} = useContext(UserContext)
    const [isAdd, setIsAdd] = useState({
        name: ''
    })
    const [allProducts, setAllProducts] = useState([])

    const fetchCategory = async () => {
        const colRef = collection(db, "categories")
        onSnapshot(colRef, (snapShot) => {
                let pro_ducts = [];
                snapShot.docs.forEach((snaps) => {
                   pro_ducts.push({...snaps.data(), id: snaps.id})
                })
            setAllProducts(pro_ducts);
            console.log(pro_ducts)
        })
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    const handleAddChange = (ev) => {
        setIsAdd({...isAdd, [ev.target.name] : [ev.target.value]})
    }

    const handleAddSubmit = async (event) => {
        event.preventDefault();  
        if(isAdd.name.toString() !== ''){
            await addDoc(collection(db, 'categories'), {
                         name: isAdd.name.toString(),
                         adminId: user.userid
                        })
                        .then((res) => {
                            $('#myModales').animate({width: 'toggle'});
                            $('#my-bg').animate({width: 'toggle'});
                            $('.emls').val();
                            toast.success('New category successfully added')
                         })
                         .catch((ers) => {
                            toast.error(ers.message)
                         })
        }else{
            toast.info('Category name is required')
        }      
    }

    const handleToggleModales = () => {
        $('#myModales').animate({
            width: 'toggle'
        });
        $('#my-bg').animate({
            width: 'toggle'
        })
    }

    const handleDelete = async (ev) => {
        await deleteDoc(doc(db, 'categories', ev.target.id))
                       .then((res) => {
                         toast.success('Successfully deleted')
                       })
                       .catch((err) => {
                        toast.error(err.message)
                       })
    }

    return (
    <div className='container-fluid' id='cont-fd'>
   <div className='backdrop-background' onClick={handleToggleModales} id='my-bg'></div>
    <div className='col-dv-2'>
    <span style={{display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
    <h4>Product's Categories</h4>
    <button type='button' id='add-user' onClick={handleToggleModales}>New Category</button>
    </span>
    <table className='table'>
      <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
      </tr>
      {!!allProducts && allProducts.map((prd, indx) => {
        return (
            <tr>
                <td>{indx + 1}.</td>
                <td>{prd.name}</td>
                <td>
                 <button id={prd.id} onClick={handleDelete} style={{margin: '5px', cursor: 'pointer', zIndex: '16000'}}><icons.Trash3Fill id={prd.id} onClick={handleDelete} className='td-icn' style={{color: 'rgb(227, 15, 15)', zIndex: '100'}} title='delete' /></button>
                </td>
            </tr>
        );
      })}   
    </table>
    </div>
    <div className='modal' id='myModales'>
    <form onSubmit={handleAddSubmit}>
    <div className='modal-content'>
          <div className='modal-header'>
            <h1>Add category</h1>
          </div>  
          <div className='modal-body'>
            <span className='prd-nem'><icons.TagsFill/></span>
            <div className='modal-nav'>
             <input type='text' className='emls' placeholder='Add New Category' name='name' onChange={handleAddChange}/>
            </div>
            <span style={{margin: '20px'}}></span> 
          </div>
          <div className='modal-footer'>
            <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleToggleModales}>Back</button>
            <button type='submit'  className='mod-btn' id='mod-btn-grn'>New Category</button>
          </div>
    </div>
    </form>
    </div>

    </div>
    );
}

export default AllCategories
