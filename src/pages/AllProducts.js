import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { UserContext } from '../context/UserContext'
import * as icons from 'react-bootstrap-icons'
import $ from 'jquery'
import { toast } from 'react-toastify'
import yeet from '../images/default-product.png'

const AllProducts = () => {
    const {user} = useContext(UserContext)
    const [isAdd, setIsAdd] = useState({
        name: '',
        quantity: '',
        cprice : '',
        sprice : '',
        description : '',
        new : '',
        cat: '',
        offer: '',
        discount: ''
    })
    const [isChange, setIsChange] = useState({
        name: '',
        quantity: '',
        cprice : '',
        sprice : '',
        description : '',
        new : '',
        cat: '',
        offer: '',
        discount: ''
    })
    const [allProducts, setAllProducts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [data, setData] = useState({
        dt: {},
        id: ''
    });

    const fetchProducts = async () => {
        const colRef = collection(db, "products")
        onSnapshot(colRef, (snapShot) => {
                let pro_ducts = [];
                snapShot.docs.forEach((snaps) => {
                   pro_ducts.push({...snaps.data(), id: snaps.id})
                })
            setAllProducts(pro_ducts);
        })
    }

    const fetchCategory = async () => {
        const colRef = collection(db, "categories")
        onSnapshot(colRef, (snapShot) => {
                let pro_ducts = [];
                snapShot.docs.forEach((snaps) => {
                   pro_ducts.push({...snaps.data(), id: snaps.id})
                })
            setAllCategories(pro_ducts);
            console.log(pro_ducts)
        })
    }

    const handleToggleEdit = async (e) => {
    await getDoc(doc(db, "products", e.target.id))
          .then((docSnap) => {
           setData({dt : docSnap.data(), id : e.target.id})
           })
          .catch((ers) => {
           toast.error(ers.message)
          })
          console.log(!!data && data)
        $('#myModal').animate({
         width: 'toggle'
        });
    }

    useEffect(() => {
        fetchProducts();
        fetchCategory();
    }, [])

    const handleAddChange = (ev) => {
        setIsAdd({...isAdd, [ev.target.name] : [ev.target.value]})
    }

    const handleChange = (e) => {
        setIsChange({...isChange, [e.target.name] : [e.target.value]})
    }

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        let prd_img = document.getElementById('alt-img').src;
                if(prd_img !== ''){
                    if(isAdd.name.toString() !== ''){
                        if(isAdd.quantity.toString() !== ''){
                            if(isAdd.cprice.toString() !== ''){
                                if(isAdd.sprice.toString() !== ''){
                                    if(isAdd.description.toString() !== ''){
                                        if(isAdd.new.toString() !== ''){
                                            if(isAdd.cat.toString() !== ''){
                                                if(isAdd.offer.toString() !== ''){
                                                    if(isAdd.discount.toString() !== ''){
                                                        await addDoc(collection(db, 'products'),{
                                                            imeg : prd_img,
                                                            name: isAdd.name.toString(), 
                                                            quantity: isAdd.quantity.toString(), 
                                                            cprice: isAdd.cprice.toString(), 
                                                            sprice: isAdd.sprice.toString(), 
                                                            description: isAdd.description.toString(),
                                                            new : isAdd.new.toString(),
                                                            cat : isAdd.cat.toString(),
                                                            offer : isAdd.offer.toString(),
                                                            discount : isAdd.discount.toString(),
                                                            adminId: user.userid,
                                                            views: '0'
                                                           })
                                                           .then((res) =>{
                                                               $('#myModales').animate({
                                                                 width: 'toggle'
                                                               });
                                                               toast.success('Added product successfully!')
                                                               $('.emls').val('');
                                                           })
                                                           .catch((errors) => {
                                                               toast.error(errors.message)
                                                           })
                                                    }else{
                                                        toast.info('Please indicate the product discount')
                                                    }
                                                }else{
                                                    toast.info('Please indicate the product offers')
                                                }
                                            }else{
                                                toast.info('Please indicate the product category')
                                            }
                                        }else{
                                            toast.info('Please indicate the product type')
                                        }   
                                    }else{
                                        toast.error('Product description is required!')
                                    }
                                }else{
                                    toast.error('Set your selling price!')
                                }
                            }else{
                                toast.error('Indicate your buying price!')
                            }
                        }else{
                            toast.info('Product quantity is required!')
                        }
                    }else{
                        toast.info('Product name is required!')
                    }
                }else{
                    toast.info('Product Image is required!')
                }
    }

    const handleChangeSubmit = async (event) => {
        event.preventDefault();
        let prd_id = document.getElementById('prdid').value;
        let prd_img = document.getElementById('alt-imgs').src;
                if(prd_img !== ''){
                    if(isChange.name.toString() !== ''){
                        if(isChange.quantity.toString() !== ''){
                            if(isChange.cprice.toString() !== ''){
                                if(isChange.sprice.toString() !== ''){
                                    if(isChange.description.toString() !== ''){
                                        if(isChange.new.toString() !== ''){
                                            if(isChange.cat.toString() !== ''){
                                                if(isChange.offer.toString() !== ''){
                                                    if(isChange.discount.toString() !== ''){
                                                        await updateDoc(doc(db, 'products', prd_id), {
                                                            imeg : prd_img,
                                                            name: isChange.name.toString(), 
                                                            quantity: isChange.quantity.toString(), 
                                                            cprice: isChange.cprice.toString(), 
                                                            sprice: isChange.sprice.toString(), 
                                                            description: isChange.description.toString(),
                                                            new : isChange.new.toString(),
                                                            cat : isChange.cat.toString(),
                                                            offer : isChange.offer.toString(),
                                                            discount : isChange.discount.toString(),
                                                            adminId: user.userid
                                                           })
                                                           .then((res) =>{
                                                            $('#myModal').animate({
                                                                width: 'toggle'
                                                               });
                                                               toast.success('Product updated successfully!')
                                                               $('.emls').val('');
                                                           })
                                                           .catch((errors) => {
                                                               toast.error(errors.message)
                                                           })
                                                    }else{
                                                        toast.info('Please indicate the product discount')
                                                    }
                                                }else{
                                                    toast.info('Please indicate the product offers')
                                                }
                                            }else{
                                                toast.info('Please indicate the product category')
                                            }
                                        }else{
                                            toast.info('Please indicate the product type')
                                        }   
                                    }else{
                                        toast.error('Product description is required!')
                                    }
                                }else{
                                    toast.error('Set your selling price!')
                                }
                            }else{
                                toast.error('Indicate your buying price!')
                            }
                        }else{
                            toast.info('Product quantity is required!')
                        }
                    }else{
                        toast.info('Product name is required!')
                    }
                }else{
                    toast.info('Product Image is required!')
                }
    }

    const handleToggleModales = () => {
        $('#myModales').animate({
            width: 'toggle'
        });
    }

    const handleToggleModal = () => {
        $('#myModal').animate({
            width: 'toggle'
        });
    }

    const handleImage = () => {
        $('#alt-file').trigger('click');
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const preview = document.querySelector('#alt-img');
        const previews = document.querySelector('#alt-imgs');
        const reader = new FileReader();
        reader.onload = () => {
            preview.src = reader.result;
            previews.src = reader.result;
        }
        if(file){
            reader.readAsDataURL(file)
        }
    }

    const handleDelete = async (ev) => {
        await deleteDoc(doc(db, 'products', ev.target.id))
                       .then((res) => {
                         toast.success('Successfully deleted')
                       })
                       .catch((err) => {
                        toast.error(err.message)
                       })
    }

    return (
    <div className='container-fluid' id='cont-fd'>
    
    <div className='col-dv-2'>
    <span style={{display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
    <h4>Products details</h4>
    <button type='button' id='add-user' onClick={handleToggleModales}>Add products</button>
    </span>
    <table className='table'>
      <tr>
          <th>#</th>
          <th>Image</th>
          <th>Product name</th>
          <th>Quantity</th>
          <th>Cost price</th>
          <th>Selling price</th>
          <th>action</th>
      </tr>
      {!!allProducts && allProducts.map((prd, indx) => {
        return (
            <tr>
                <td>{indx + 1}.</td>
                <td><img src={prd.imeg} alt='alt_product' id='alt-imgs'/></td>
                <td>{prd.name}</td>
                <td>{prd.quantity}</td>
                <td>{prd.cprice}</td>
                <td>{prd.sprice}</td>
                <td>
                    <button id={prd.id} onClick={handleToggleEdit} style={{margin: '5px', cursor: 'pointer', zIndex: '16000'}}><icons.PencilFill id={prd.id} onClick={handleToggleEdit} className='td-icn' title='edit' style={{ zIndex: '100'}}/></button>
                    <button id={prd.id} onClick={handleDelete} style={{margin: '5px', cursor: 'pointer', zIndex: '16000'}}><icons.Trash3Fill id={prd.id} onClick={handleDelete} className='td-icn' style={{color: 'rgb(227, 15, 15)', zIndex: '100'}} title='delete' /></button>
                </td>
            </tr>
        );
      })}
    
    </table>
    </div>
 
    <div className='modal' id='myModal'>
    <form onSubmit={handleChangeSubmit}>
    <div className='modal-content'>
          <div className='modal-header'>
           <h1>{!!data && data.dt.name}</h1>
            <img src={!!data && data.dt.imeg} alt='alt_product' id='alt-imgs'/>
            <icons.PlusCircleDotted id='alt-edit' title='change image' onClick={handleImage} />
            <input type='file' accept='.jpg,.png,.jpeg' id='alt-file' hidden onChange={handleImageChange}/>
            <input type='text' value={!!data && data.id} id='prdid' hidden/>
          </div>  
          <div className='modal-body'>
            <span>Product name</span>
            <div className='modal-nav'>
             <input type='text' className='emls' placeholder='Product title' name='name' onChange={handleChange}/>
            </div>
            <span>Quantity</span>
            <div className='modal-nav'>
             <input type='number' className='emls' name='quantity' placeholder='Number of items' onChange={handleChange}/>
            </div>
            <span>Cost price</span>
            <div className='modal-nav'>
             <input type='number' className='emls' name='cprice' placeholder='Enter your Buying price' onChange={handleChange}/>
            </div>
            <span>Selling price</span>
            <div className='modal-nav'>
             <input type='number' className='emls' name='sprice' placeholder='Set your selling price' onChange={handleChange}/>
            </div>
            <span>Description</span>
            <div className='modal-nav'>
             <textarea type='text' className='emls' name='description' placeholder='Tell us more about the product detail' onChange={handleChange}></textarea>
            </div>
            <span>Is this a new product?</span>
            <div className='modal-nav'>
            <select className='emls' name='new' onChange={handleChange}>
            <option>select</option>
             <option value='Yes'>Yes</option>
             <option value='No'>No</option>
            </select>
            </div>
            <span>Select category</span>
            <div className='modal-nav'>
            <select className='emls' name='cat' onChange={handleChange}>
             <option>select</option>
             {!!allCategories && allCategories.map(cate => {
                return (
                    <option value={cate.name}>{cate.name}</option>
                );
             })}
            </select>
            </div>
            <span>Is product on offer?</span>
            <div className='modal-nav'>
            <select className='emls' name='offer' onChange={handleChange}>
             <option>select</option>
             <option value='Yes'>Yes</option>
             <option value='No'>No</option>
            </select>
            </div>
            <span>If yes, indicate the discount (%)</span>
            <div className='modal-nav'>
             <input type='number' className='emls' name='discount' placeholder='e.g. 10, 20, ...' onChange={handleChange}/>
            </div>
            <span style={{margin: '20px'}}></span> 
          </div>
          <div className='modal-footer'>
          <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleToggleModal}>Back</button>
          <button type='submit'  className='mod-btn' id='mod-btn-grn'>Edit product</button>
          </div>
    </div>
    </form>
    </div>

    <div className='modal' id='myModales'>
    <form onSubmit={handleAddSubmit}>
    <div className='modal-content'>
          <div className='modal-header'>
            <h1>Add product</h1>
            <img src={yeet} alt='alt_product' id='alt-img'/>
            <icons.PlusCircleDotted id='alt-edit' title='change image' onClick={handleImage} />
            <input type='file' accept='.jpg,.png,.jpeg' id='alt-file' hidden onChange={handleImageChange}/>
          </div>  
          <div className='modal-body'>
            <span>Product name</span>
            <div className='modal-nav'>
             <input type='text' className='emls' placeholder='Product title' name='name' onChange={handleAddChange}/>
            </div>
            <span>Quantity</span>
            <div className='modal-nav'>
             <input type='number' className='emls' name='quantity' placeholder='Number of items' onChange={handleAddChange}/>
            </div>
            <span>Cost price</span>
            <div className='modal-nav'>
             <input type='number' className='emls' name='cprice' placeholder='Enter your Buying price' onChange={handleAddChange}/>
            </div>
            <span>Selling price</span>
            <div className='modal-nav'>
             <input type='number' className='emls' name='sprice' placeholder='Set your selling price' onChange={handleAddChange}/>
            </div>
            <span>Description</span>
            <div className='modal-nav'>
             <textarea type='text' className='emls' name='description' placeholder='Tell us more about the product detail' onChange={handleAddChange}></textarea>
            </div>
            <span>Is this a new product?</span>
            <div className='modal-nav'>
            <select className='emls' name='new' onChange={handleAddChange}>
             <option></option>
             <option value='Yes'>Yes</option>
             <option value='No'>No</option>
            </select>
            </div>
            <span>Select category</span>
            <div className='modal-nav'>
            <select className='emls' name='cat' onChange={handleAddChange}>
             <option></option>
             {!!allCategories && allCategories.map(cate => {
                return (
                    <option value={cate.name}>{cate.name}</option>
                );
             })}
            </select>
            </div>
            <span>Is product on offer?</span>
            <div className='modal-nav'>
            <select className='emls' name='offer' onChange={handleAddChange}>
             <option></option>
             <option value='Yes'>Yes</option>
             <option value='No'>no</option>
            </select>
            </div>
            <span>If yes, indicate the discount (%)</span>
            <div className='modal-nav'>
             <input type='number' className='emls' name='discount' placeholder='e.g. 10, 20, ...' onChange={handleAddChange}/>
            </div>
            <span style={{margin: '20px'}}></span> 
          </div>
          <div className='modal-footer'>
          <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleToggleModales}>Back</button>
          <button type='submit'  className='mod-btn' id='mod-btn-grn'>Add product</button>
          </div>
    </div>
    </form>
    </div>

    </div>
  )
}

export default AllProducts
