import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import * as icons from 'react-bootstrap-icons'
import { db } from '../firebase'
import Loading_icon from '../images/empty.png'
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import {UserContext} from '../context/UserContext'

const Cart = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [isCartID, setIsCartID] = useState([]) 
    const [isChecked, setIsChecked] = useState({
      method : '',
      reference: ''
    })
    const [isCoupons, setIsCoupons] = useState([])

    const handleClick = async () => {
        $('.container-row').animate({
            width: 'toggle'
        });

        setTimeout(() => {
          navigate('/dashboard')
        })
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
    }, [isCartID])

  const handleDelete = async (ev) => {
      await deleteDoc(doc(db, 'cart', ev.target.id))
                     .then((res) => {
                       console.log('done')
                     })
                     .catch((err) => {
                      toast.error(err.message)
                     })
  }

  const handleAddProductCart = async (evs) => {
    const crtinput = document.getElementById('crt-'+evs.target.id).value;
    document.getElementById('crt-' + evs.target.id).value ++; 

    if(crtinput < 0){

     await deleteDoc(doc(db, 'cart', evs.target.id))
                   .then((res) => {
                         toast.success('Successfully deleted')
                    })
                   .catch((err) => {
                          toast.error(err.message)
                    })
    }else{    
      if(crtinput === ''){
        document.getElementById('prce-'+evs.target.id).innerHTML = 1 * evs.target.className;
        document.getElementById('prc-'+evs.target.id).innerHTML = 1 * evs.target.className;
      }else{
      const mutlinterger = parseInt(crtinput) + 1;
      const multiply = mutlinterger * evs.target.className;
      document.getElementById('prce-'+evs.target.id).innerHTML = multiply.toLocaleString();
      document.getElementById('prc-'+evs.target.id).innerHTML = multiply;
      }
    }

   }
 
   const handleMinusProductCart = async (evs) => {
    const crtinput = document.getElementById('crt-'+evs.target.id).value;
    document.getElementById('crt-' + evs.target.id).value --; 
 
    if(crtinput < 2){
     await deleteDoc(doc(db, 'cart', evs.target.id))
                   .then((res) => {
                         console.log('done')
                    })
                   .catch((err) => {
                          toast.error(err.message)
                    })
    }else{
    const mutlinterger = parseInt(crtinput) - 1;
    const multiply = mutlinterger * evs.target.className;
    document.getElementById('prce-'+evs.target.id).innerHTML = multiply.toLocaleString();
    document.getElementById('prc-'+evs.target.id).innerHTML = multiply;
    } 

   }
            
  useEffect(() => {
    var ttl = 0.00;
    var prdt_length = document.getElementsByClassName('cart-col').length;
    
    $('.pricee').each(function(){
      var prc = $(this).text() 
      ttl += parseInt(prc); 
    })

    document.getElementById('pdl').innerHTML = prdt_length;
    var disoff = document.getElementById('disoff').innerHTML;
    var to_tal = ttl - disoff ;
    document.getElementById('ttprc').innerHTML = to_tal.toLocaleString();
    document.getElementById('ttprcs').innerHTML = to_tal.toLocaleString();
    document.getElementById('fnlprc').innerHTML = ttl.toLocaleString();
    document.getElementById('fnlprcs').innerHTML = ttl.toLocaleString();

    var fnlprc = document.getElementById('fnlprc').innerHTML;
    if(fnlprc <= 0){
      document.getElementById('btn-ord').disabled = true;
      document.getElementById('btn-ord').style.backgroundColor = 'gray'
    }else{
      document.getElementById('btn-ord').disabled = false;
      document.getElementById('btn-ord').style.backgroundColor = 'rgb(18, 192, 38)';
    }
  
  }, [isCartID]) 
  
  const handleChecked = (e) => {
    setIsChecked({...isChecked, [e.target.name]: [e.target.value]})
  }

  //check here
  const handleOrder = async() => {
    var date = new Date();
    //calendar
    var cur_date = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    //time
    var h = date.getHours();
    var min = date.getMinutes();
    var  sec = date.getSeconds();
    var session = 'am';
    if(h > 12){
      h = h - 12;
      session = 'pm';
    }
    if(min < 10){
      min = '0' + min;
    }
    if(sec < 10){
      sec = '0' + sec;
    }
    //day of the week
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = date.getDay();
    var cur_day = days[day];

    var calendar = h + ':' + min + ':' + sec + session + ' ' + cur_day + ', ' + cur_date + '/' + month + '/' + year;
   
    const dta = [];
    var elem = document.getElementsByClassName('crt-name');
    var disc = document.getElementById('disoff').innerHTML;
    var ttl = document.getElementById('ttprc').innerHTML;
    var delid = document.getElementsByClassName('xlg-link');

    for(var i = 0 ; i < elem.length ; i++){
      dta.push({name : elem[i].title, amt : elem[i].innerText}) 
    }  

    const inv_oice = Math.floor(Math.random() * '0123456789');
    //ADDING COUPONS
   var copun = parseFloat(ttl.replace(/,/g, ''));
     if(copun >= 1000){
     //coupon
       await addDoc(collection(db, 'coupons'), {
         coupon: 20,
         userid: !!user && user.userid,
         due_month : month,
         due_year: year,
        isActivated: "not activated"
       })
       .then((res) => {
         console.log('Coupon added')
       })
       .catch((err) => {
         console.log("Coupon not Added..." + err.message)
       })
     }else{
       await addDoc(collection(db, 'coupons'), {
         coupon: 5,
         userid: !!user && user.userid,
         due_month : month,
         due_year: year,
        isActivated: "not activated"
       })
       .then((res) => {
         console.log('Coupon added')
       })
       .catch((err) => {
         console.log("Coupon not Added..." + err.message)
       })
     }
     
    if(isChecked.method.toString() !== ''){
      if(isChecked.method.toString() === 'cash'){
        await addDoc(collection(db, 'orders'),{
                     userid : !!user && user.userid,
                     order: dta,
                     discount : disc,
                     total: ttl,
                     inovice : inv_oice,
                     method: isChecked.method.toString(),
                     calender : calendar,
                     due_month : month,
                     due_year: year,
                     progress: 'Pending',
                     createdAt: serverTimestamp()
                    })
                    .then((res) => {
                     toast.success('Ordered successfully');
                     navigate('/orders')

                     })
                    .catch((err) => toast.error(err.message));
        
          for(var j = 0; j < delid.length; j++){
            deleteDoc(doc(db, 'cart', delid[j].id))
                     .then((res) => {console.log('Yeey')})
                     .catch((err) => {console.log(err.message)})
          }

      }else{
        if(isChecked.reference.toString() !== ''){
          await addDoc(collection(db, 'orders'),{
                        userid : !!user && user.userid,
                        order: dta,
                        discount : disc,
                        total: ttl,
                        inovice : inv_oice,
                        method: isChecked.method.toString(),
                        reference: isChecked.reference.toString()
                      })
                      .then((res) => {
                        $('.xlg-link').each(() => {
                          $(this).trigger('click')
                        })
                        toast.success('Ordered successfully')
                        navigate('/orders')
                      })
                      .catch((err) => toast.error(err.message))
        }else{
          toast.info('Enter Mpesa transaction code')
        }
      }
    }else{
      toast.info('Select payment method')
    }

    //REMOVING COUPONS
     isCoupons.forEach(async (coup) => {
          if(coup.isActivated === 'activated' && coup.userid === user.userid){
            await deleteDoc(doc(db, 'coupons', coup.id))
            .then((res) => {
              toast.success("Your coupons were used successfully")
            })
            .catch((errs) => { toast.error("Your activated coupons were not used.") })
          }
        })

  }

     async function fetchCoupons () {
          const colRef = collection(db, "coupons")
          onSnapshot(colRef, (snapshot) => {
            let coupons = [];
            snapshot.docs.forEach((snaps) => {
              coupons.push({...snaps.data(), id: snaps.id})
            })
            setIsCoupons(coupons);
          })
     }
      
      useEffect(() => {
        fetchCoupons()
      }, [])
  
    useEffect(() => {
      if(isCoupons.length > 0){
        const ttlcpn = [];
        isCoupons.forEach((coup => {
          if(coup.isActivated === 'activated' && user.userid === coup.userid){
               ttlcpn.push(coup.coupon)
          }else{
            ttlcpn.push(0)
          }
        }))
        const sum = ttlcpn.reduce((a, b) => a + b, 0);
        $("#disoff").text(sum.toLocaleString())
      }
    }, [isCoupons, user])
 
  return (
  <div id='cart'>
   
    <div className={isModal ? 'open-modal' : 'close-modal'}>
    <div className='back-bg'>
      <Link  onClick={closeModal}>
      <icons.ChevronRight className='back'/>
      </Link> 
    </div> 
    <div className='modal-header'> 
      <h3 className='header-cart'>Review and Pay</h3>
      <div className='modal-total'>
        <p>Order Value</p>
        <span id='fnlprc'>0.00 KES</span>
      </div>
      <div className='modal-total'> 
        <p>Discount (Offer) </p>
        <span style={{color: 'green'}} id='disoff'>0.00</span>
      </div>
      <div className='modal-total'>
        <h5>Total</h5>
        <h5 id='ttprc'>0.00 KES</h5>
      </div>
      <h3 className='header-cart'>Payment Method</h3>
      <div className='modal-pay'>
       <button className='lipa'>
       <div>
       <input type='checkbox' name='method' value='mpesa' onChange={handleChecked}/>
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
        <input type='text' className='tcode' placeholder='Enter Mpesa Transaction Code' name='reference'/>
       </div>
       </div>
      </div>
      <div className='modal-pay' style={{marginTop: '5px'}}>
      <button className='lipa'><div><input type='checkbox' name='method' value='cash' onChange={handleChecked}/> Cash on Delivery</div> <icons.Wallet2 style={{fontSize: '20px'}}/></button>
      </div>
    </div>
    <input type='text' id='doc-id' value={!!isCartID && isCartID.map((crt) => crt.id )} hidden/>
    <Link onClick={handleOrder}>
    <button type='button' className='btn_orders' onClick={handleModal}><div><icons.Cart3/> Place Order</div> <span className='finalprc' id='ttprcs'>0.00 KES</span></button>
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
        <h5><span id='pdl'></span> Products</h5>
    </div>
    <div className='container-row' id='cart-scroll'>
     {!!isCartID && isCartID.length > 0 
     ? 
     !!isCartID && isCartID.map((crt) => {
      if(!!user){
      if(crt.userid !== user.userid){
        return !crt;
      }
      }
      return (
        <div className='cart-col'>
        <img src={!!crt.cartdata.imeg ? crt.cartdata.imeg : Loading_icon} className='cart_img' alt='img_src'/>
        <div>
        <h5>{crt.cartdata.name}</h5>
        <p>
         <span className='pricee' id={'prc-' + crt.id} style={{display: 'none'}}>{crt.cartdata.sprice}</span>
         <span id={'prce-'+crt.id} className='crt-name' title={crt.cartdata.name}>{crt.cartdata.sprice}</span> KES
        </p>
        <div>
          <input type='button' className={crt.cartdata.sprice} value='+' onClick={handleAddProductCart} id={crt.id}/>
          <input type='number' className='cart-input' id={'crt-' + crt.id} style={{border: 'none', outline: 'none'}} placeholder='1' readOnly/>
          <input type='button' className={crt.cartdata.sprice} value='—' onClick={handleMinusProductCart} id={crt.id}/> 
        </div>
        </div>
        <input type='button' className='xlg-link' id={crt.id} onClick={handleDelete} value='X'/> 
        </div>    
      );
     })
     :
     <img src={Loading_icon} className='imgss' alt='Loading_icon'/>
     }
    </div>
    </div>

    <button type='button' id='btn-ord' className='btn_order' onClick={handleModal}><div><icons.Cart3/> Confirm Order</div> <span className='finalprc' id='fnlprcs'>0.00 KES</span></button>
  
  </div>
  )
}

export default Cart 
