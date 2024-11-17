import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { db } from '../firebase'
import Loading_icon from '../images/Loading_icon.gif'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { toast } from 'react-toastify'

const Cart = () => {
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [isCartID, setIsCartID] = useState([])

    const handleClick = async () => {
        $('.container-row').animate({
            width: 'toggle'
        });

        setTimeout(() => {
        navigate('/')
        }, 500)
    } 

    const handleModal =  async() => {
      setIsModal(true)
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
    }

    const closeModal =  async() => {
      setIsModal(false)
      $('#myModal').animate({
        width: 'toggle'
      }, 100);
    }

    const handleLipa = () => {
        $('#payd').animate({
            height: 'toggle',
            show : 'toggle'
        })
    }

    async function fetchCartId(){
      const colRef = collection(db, 'cart')
      await onSnapshot(colRef, (snapshot) => {
        let cartID = [];
    
        snapshot.docs.forEach((doces) => {
          cartID.push({...doces.data(), id: doces.id}); 
        })
       
        setIsCartID(cartID)
      })
    }

    useEffect(() => {
      fetchCartId()
    }, [])

  const handleDelete = async (ev) => {
      await deleteDoc(doc(db, 'cart', ev.target.id))
                     .then((res) => {
                       toast.success('Successfully deleted')
                     })
                     .catch((err) => {
                      toast.error(err.message)
                     })
  }

  const totalPrice = () => {
    var prc = document.getElementsByClassName('price').innerHTML;
    var ttl = 0;
    ttl+= parseFloat(parseInt(prc)); 
    document.getElementById('fnlprc').innerHTML = ttl;
    console.log(prc) 
  }

  useEffect(() => {
    totalPrice();
  }, [])

  return (
    <div id='cart'>
    
    <div className={isModal ? 'open-modal' : 'close-modal'} id='myModal'>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div> 
    <div className='modal-header'> 
      <h3 className='header-cart'>Review and Pay</h3>

      <div className='modal-total'>
        <p>Order Value</p>
        <span>3000 KES</span>
      </div>
      <div className='modal-total'>
        <p>Discount (Offer) </p>
        <span style={{color: 'green'}}>50 KES</span>
      </div>
      <div className='modal-total'>
        <h5>Total</h5>
        <h5>2550 KES</h5>
      </div>
      <h3 className='header-cart'>Payment Method</h3>
      <div className='modal-pay'>
       <button className='lipa'>
       <div>
       <input type='checkbox'/>
        Lipa na Mpesa
       </div> 
       <icons.ChevronDown onClick={handleLipa} style={{fontSize: '20px'}} />
       </button>
       
       <div id='payd'>
       <div className='mpesa'>
        <h3>BUY GOOD AND SERVICES</h3>
        <div className='pay-bill'>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        <input type='number' className='paybill'/>
        </div>
        <p>Tech Store</p>
        <input type='text' className='tcode' placeholder='Enter Mpesa Transaction Code'/>
       </div>
       </div>

      </div>
      <div className='modal-pay' style={{marginTop: '5px'}}>
      <button className='lipa'><div><input type='checkbox'/> Cash on Delivery</div> <icons.Wallet2 style={{fontSize: '20px'}}/></button>
      </div>
    </div>
    <Link to='/orders'>
    <button type='button' className='btn_orders' onClick={handleModal}><div><icons.Cart3/> Place Order</div> <span className='finalprc'>2550 KES</span></button>
    </Link>
    </div>
    
    <div>
     <div className='back-bg'>
        <Link  onClick={handleClick}>
        <icons.ChevronRight className='back'/>
        </Link>
     </div>
     <h3 className='header-cart'><icons.Cart3 className='cart-icon'/> Cart</h3>
     <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '10px', paddingLeft: '10px'}}>
        <h5>Product details</h5>
        <h5>{!!isCartID && isCartID.length} Products</h5>
     </div>
     <div className='container-row' id='cart-scroll'>
     {!!isCartID
     ? 
     isCartID.map((crt) => {
      console.log(crt)
      return (
        <div className='cart-col'>
         <img src={!!crt.cartdata.imeg ? crt.cartdata.imeg : Loading_icon} className='cart_img' alt='img_src'/>
        <div>
        <h5>{crt.cartdata.name}</h5>
        <p><span className='price'>{crt.cartdata.sprice}</span> KES</p>
        <div>
         <input type='number' className='cart_input' placeholder='0' id='cart-input'/>
        </div>
        </div>
        <Link className='xlg-link' id={crt.id} onClick={handleDelete}><icons.XLg id={crt.id} onClick={handleDelete}/></Link>
        </div>    
      );
     })
     :
     <img src={Loading_icon} className='img' alt='Loading_icon'/>
     }

     </div>

    </div>

    <button type='button' className='btn_order' onClick={handleModal}><div><icons.Cart3/> Confirm Order</div> <span className='finalprc' id='fnlprc'>3000 KES</span></button>
    </div>
  )
}

export default Cart 
