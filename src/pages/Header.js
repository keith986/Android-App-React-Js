import { addDoc, collection, deleteDoc, doc, setDoc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import * as icons from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import Loading_icon from '../images/empty.png'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import $ from 'jquery'
import axios from 'axios'
import PhoneInput from 'react-phone-input-2'

const Header = () => {
  const [isModal, setIsModal] = useState(false)
  const [isProducts, setIsProducts] = useState([])
  const [filterData, setIsFilterData] = useState([])
  const [isModals, setIsModals] = useState(false)
  const [viewPrdt, setViewPrdt] = useState([])
  const {user} = useContext(UserContext)
  const [isCartID, setIsCartID] = useState([]) 
  const [isChecked, setIsChecked] = useState({
        method : ''
  })
    const navigate = useNavigate()
    const [isOrders, setIsOrders] = useState([])
    const [isOrderData, setIsOrderData] = useState({})
    const [orderItem, setOrderItem] = useState([])
    const [isProd, setIsProd] = useState([])
    const [selectedOrd, setSelectedOrd] = useState('active')
    const [isAddress, setIsAddress] = useState({
        city: '',
        location: ''
    })
    const [isPhoneNumber, setIsPhoneNumber] = useState([])
    const [userAddress, setUserAddress] = useState([])
    const [isQry, setIsQry] = useState({
      qryone : '',
      qrytwo : '',
      qrythree : '',
      qryfour : '',
      qryfive : '',
      otherqry : ''
    })
    const [isSuggestion, setIsSuggestion] = useState({
        prblmone : '',
        prblmtwo : '',
        prblmthree : '',
        prblmfour : '',
        others : ''
    })
    const [isWishData, setIsWishData] = useState([])
    const [isCoupons, setIsCoupons] = useState([])

    const handleChangess = (e) => {
        setIsSuggestion({...isSuggestion, [e.target.name]:[e.target.value] })
    }
  
  const handlePhone = async () => {
    $('#fon').animate({
        height: 'toggle',
        show : 'toggle'
    })
  }

  const handleAddress = (ev) => {
    setIsAddress({...isAddress, [ev.target.name]: [ev.target.value]})
  }

const handleLoc = async () => {
    $('#loc').animate({
        height: 'toggle',
        show : 'toggle'
    })
}

const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if(isAddress.city.toString().length > 0){
      if(isAddress.location.toString().length > 0){
        await setDoc(doc(db, "address", user.userid),{
                     city: isAddress.city.toString(),
                     location: isAddress.location.toString()
                     })
                    .then((resp) => {
                     toast.success('Address updated successfully')
                     })
                    .catch((errors) => {
                     toast.error('Could not update Address!')
                     })
      }else{
        toast.info('Specify your location')
      }
    }else{
      toast.info('Select your city')
    }
}

const addressDetail = async () => {
  const colRef = doc(db, "address", user.userid);
  const docRef = await getDoc(colRef)
  
  if(docRef.exists()){
    setUserAddress(docRef.data())
  }else{
    setUserAddress([])
  }

}

useEffect(() => {
  addressDetail()
})

const handlePhoneNumber = (eve) => {
  setIsPhoneNumber('+' + eve)
}

const submitPhoneNumber = async (event) => {
  event.preventDefault();
  
      if(isPhoneNumber.toString() !== ''){
        await updateDoc(doc(db ,"customers", user.userid), {
                         phonenumber: isPhoneNumber.toString()
                        })
                       .then(() => {
                         axios.post('/contacts', {userid: user.userid, phonenumber: isPhoneNumber.toString()})
                              .then((res) => {
                                   if(res.data.success){
                                    toast.success('Phone number updated successfully')
                                   }else if(res.data.error){
                                    toast.error(res.data.error)
                                   }
                               })
                              .catch((err) => {
                                toast.error(err.message)
                               })       
                        })
                       .catch((error) => {
                         toast.error('Could not update phone number!')
                        })
      }else{
        toast.info('Invalid phone number')
      }

}

   const fetchOrders = async() => {
        const colRef = collection(db, 'orders')
        const qRef = query(colRef, orderBy('createdAt', "desc"))
        await onSnapshot(qRef, (snapshot) => {
          let orderID = [];
      
          snapshot.docs.forEach((doces) => {
            orderID.push({...doces.data(), id: doces.id}); 
          })
         
          setIsOrders(orderID)
        })
   }
  
      const fetchProductss = async () => {
        const qry = collection(db, 'products');
        onSnapshot(qry, (snapshot) => {
          let qrydt = [];
          snapshot.docs.forEach((snaps) => {
            qrydt.push({...snaps.data()})
          })
          setIsProd(qrydt)
        })
      }
  
      useEffect(() => {
        fetchOrders();
        fetchProductss();
      }, [])

      const handleOrderPrv = async (e) => {
        await getDoc(doc(db, 'orders', e.target.id))
                    .then((result) => {
                        $('#smsys-sbsgs').animate({
                          width: 'toggle'
                        }, 100);
                        $('#myModalsess').animate({
                          width: "toggle"
                        });
                        $('#msys-sbsgs').animate({
                          width: "toggle"
                        });
                        $('#myModalsses').animate({
                          width: "toggle"
                        });
                        setIsOrderData(result.data());
                        setOrderItem(result.data().order)
                    })
                    .catch((err) => {toast.error(err.message)})
  /*
                    if(document.getElementById('chek')){
                      document.getElementById('chek').disabled = false;
                      $('#chek').trigger('click');
                    }
              
                    if(document.getElementById('cheks')){
                      document.getElementById('cheks').disabled = false;
                      $('#cheks').trigger('click');
                    }
                       
                    if(document.getElementById('chekd')){
                      document.getElementById('chekd').disabled = false;
                      $('#chekd').trigger('click');
                    }
    */
      }
  
      useEffect(() => {
        if(document.getElementById('chek')){
          document.getElementById('chek').disabled = false;
          $('#chek').trigger('click');
        }else{
         document.getElementById('no-chek').disabled = true;
          document.getElementById('no-chek').checked = false;
        } 
  
        if(document.getElementById('cheks')){
         document.getElementById('cheks').disabled = false;
          $('#cheks').trigger('click');
        }else{
          document.getElementById('no-cheks').disabled = true;
          document.getElementById('no-cheks').checked = false;
        } 
           
        if(document.getElementById('chekd')){
          document.getElementById('chekd').disabled = false;
          $('#chekd').trigger('click');
        }else{
          document.getElementById('no-chekd').disabled = true;
          document.getElementById('no-chekd').checked = false;
        } 
        setSelectedOrd('active') 
      }, [isOrderData])

       const handleOrderDel = async (ev) => {
            await updateDoc(doc(db, 'orders', ev.target.id),{
                              progress: 'cancelled'
                           })
                           .then((result) => {
                            toast.success('Cancelled successfully')
                           })
                           .catch((err) => {toast.error(err.message)})
       }

  const fetchProducts = async() => {
    const colRef = collection(db, 'products')
    await onSnapshot(colRef, (snapShot) => {
         const Prod = [];
         snapShot.docs.forEach((snap) => {
          Prod.push({...snap.data(), id: snap.id})
         })
         setIsProducts(Prod)
    })
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const handleChange = () => {
    setIsModal(true)
  }

  const handleChanges = (e) => {
    setIsQry({...isQry, [e.target.name] : [e.target.value] })
  }

  async function handleSubmitQry(ev) {
        ev.preventDefault();
      if(isQry.qryone.toString() !== '' || isQry.qrytwo.toString() !== '' || isQry.qrythree.toString() !== '' || isQry.qryfour.toString() !== '' || isQry.qryfive.toString() !== '' || isQry.otherqry.toString() !== ''){
  
        await setDoc(doc(db, "productquery", user.userid), {
                     qryone : isQry.qryone.toString(),
                     qrytwo : isQry.qrytwo.toString(),
                     qrythree : isQry.qrythree.toString(),
                     qryfour : isQry.qryfour.toString(),
                     qryfive : isQry.qryfive.toString(),
                     otherqry : isQry.otherqry.toString()
                    })
                    .then((res) => {
                      toast.success('Submitted successfully')
                    })
                    .catch((ers) => {
                      toast.error('Could not submit your query!')
                    })
  
      }else{
        toast.info('No selection made')
        
        $('#qryerr-id').html('No selection made!')
        
      }
  } 

  const handleCloseModal = () => {
    setIsModal(false) 
  }

  const handleCloseModals = () => {
    setIsModals(false) 
  }

  const handleChangeProduct = async (ev) => {
    const filt = !!isProducts && isProducts.filter(f => f.name.includes(ev.target.value))  
    setIsFilterData(filt);
  }

  async function handleViewProduct(ev) {
    const colRef = doc(db, "products", ev.target.id);
    const docSnap = await getDoc(colRef);
    if(docSnap.exists()){
    setViewPrdt({...docSnap.data(), id : ev.target.id});
    setIsModals(true)
    }
  }
  
  const addToCart = async (e) => {
    const colRef = doc(db, "products", e.target.id);
    const docSnap = await getDoc(colRef);

      await addDoc(collection(db, 'cart'), {
                    cartdata : docSnap.data(),
                    userid : !!user && user.userid
                  })
                  .then((res) => {
                    toast.success('added to cart')
                  })
                  .catch((err) => {
                    toast.error('Could not add to cart')
                  })
  }

  const handleModales = () => {
    $('#myModales').animate({
      width: 'toggle'
    })
    $('#my-bsg').animate({
      width: 'toggle'
    })
    $('#myModal').hide('1000')
  }

  const handleMod = () => {
    $('#myModaless').animate({
      width: 'toggle'
    })
    $('#my-bsgs').animate({
      width: 'toggle'
    })
    $('#myModal').hide('1000')
  }

  const handleMods = () => {
    $('#myModal').animate({
      width: 'toggle'
    })
    $('#my-sbsgs').animate({
      width: 'toggle'
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
                         console.log('deleted')
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

  const handleChecked = (e) => {
    setIsChecked({...isChecked, [e.target.name]: [e.target.value]})
  }

  const handleConfirmOrder = () => {
    $('#myModaless').animate({
      width: 'toggle'
    }, 100);
    $('#my-bsgs').animate({
      width: 'toggle'
    }, 100);
    $('#my-sbsgs').animate({
      width: 'toggle'
    }, 100);
    $('#myModal').animate({
      width: 'toggle'
    }, 100);
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
    //document.getElementById('ttprcs').innerHTML = to_tal.toLocaleString();
    document.getElementById('fnlprc').innerHTML = ttl.toLocaleString();
    //document.getElementById('fnlprcs').innerHTML = ttl.toLocaleString();

    var fnlprc = document.getElementById('fnlprc').innerHTML;
    if(fnlprc <= 0){
      $('.btn-ord').hide()
      //document.getElementById('btn-ord').disabled = true;
      //document.getElementsByClassName('btn-ord').style.backgroundColor = 'gray'
    }else{
      $('.btn-ord').show()
      //document.getElementById('btn-ord').disabled = false;
      //document.getElementsByClassName('btn-ord').style.backgroundColor = 'rgb(18, 192, 38)';
    }
  
  }, [isCartID])

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
                     $('#myModal').animate({
                      width: 'toggle'
                    })
                    $('#my-sbsgs').animate({
                      width: 'toggle'
                    })
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
                        $('#myModal').animate({
                          width: 'toggle'
                        })
                        $('#my-sbsgs').animate({
                          width: 'toggle'
                        })
                        toast.success('Ordered successfully')                 
                      })
                      .catch((err) => toast.error(err.message))
        }else{
          toast.info('Enter Mpesa transaction code')
        }
      }
    }else{
      toast.info('Select payment method')
    }

    //delete all activate coupons
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

  const handleDom = () => {
    $('#myModalses').animate({
      width: 'toggle'
    })
    $('#mys-sbsgs').animate({
      width: 'toggle'
    })
  }

  const handleSignOut = async () => {
          await auth.signOut()
                    .then((resp) => {
                      toast.success('Successfully logged out')
                      navigate('/login')
                      window.location.reload();
                    })
                    .catch((errs) => {
                      toast.error('Could not log out!')
                    })
  }

  const handleOrderClick = () => {
    $('#myModalsess').animate({
      width: 'toggle'
    })
    $('#myModalses').animate({
      width: 'toggle'
    })
    $('#mys-sbsgs').animate({
      width: 'toggle'
    })
    $('#msys-sbsgs').animate({
      width: 'toggle'
    })
  }

  const handleDoms = () => {
    $('#myModalsess').animate({
      width: 'toggle'
    })
    $('#msys-sbsgs').animate({
      width: 'toggle'
    })
  }

  const handleActiveOrders = () => {
    setSelectedOrd('active');
  }

  const handleCanceledOrders = () => {
    setSelectedOrd('cancelled')
  }

  const handleCompleteOrders = () => {
    setSelectedOrd('complete')
  }

  const handleDomss = () => {
    $('#smsys-sbsgs').animate({
      width: 'toggle'
    }, 100);
    $('#myModalsses').animate({
      width: 'toggle'
    }, 100);
  }

  const handleDomRev = () => {
    $('#smsys-sbsgs').animate({
      width: 'toggle'
    }, 100);
    $('#myModalsess').animate({
      width: "toggle"
    });
    $('#msys-sbsgs').animate({
      width: "toggle"
    });
    $('#myModalsses').animate({
      width: "toggle"
    });
  }

  const handleCouponClick = () => {
     $('#myModalssesss').animate({
      width: 'toggle'
     })
     $('#myModalses').animate({
      width: 'toggle'
     })
     $('#mys-sbsgs').animate({
      width: 'toggle'
     })
     $('#ssmsys-sbsgs').animate({
      width: 'toggle'
     })
  }

  const handleSettingClick = () => {
    $('#myModalses').animate({
      width: 'toggle'
     })
     $('#myModasles').animate({
      width: 'toggle'
     })
     $('#mys-sbsgs').animate({
      width: 'toggle'
     })
     $('#sssmsys-sbsgs').animate({
      width: 'toggle'
     })
  }

  const handleSupportClick = () => {
    $('#myModalses').animate({
      width: 'toggle'
     })
     $('#mysModales').animate({
      width: 'toggle'
     })
     $('#mys-sbsgs').animate({
      width: 'toggle'
     })
     $('#sssmssys-sbsgs').animate({
      width: 'toggle'
     })
  }

  const handlePwoClick = () => {
     $('#myModalses').animate({
      width: 'toggle'
     })
     $('#msyModales').animate({
      width: 'toggle'
     })
     $('#mys-sbsgs').animate({
      width: 'toggle'
     })
     $('#sssmsssys-sbsgs').animate({
      width: 'toggle'
     })
  }

  async function handleSubmitSuggestions(event) {
        event.preventDefault();
      if(isSuggestion.prblmone.toString() !== '' || isSuggestion.prblmtwo.toString() !== '' || isSuggestion.prblmthree.toString() !== '' || isSuggestion.prblmfour !== '' || isSuggestion.others !== '' ){
  
        await setDoc(doc(db, "suggestions", user.userid), {
                      prblmone : isSuggestion.prblmone.toString(),
                      prblmtwo : isSuggestion.prblmtwo.toString(),
                      prblmthree : isSuggestion.prblmthree.toString(),
                      prblmfour : isSuggestion.prblmfour.toString(),
                      others : isSuggestion.others.toString()
                    })
                    .then((resp) => {
                      toast.success('Thank you for your suggestion(s)')
                    })
                    .catch((ers) => {
                      toast.error('Could not update your suggestions!')
                    })
      
      }else{
        toast.info('No suggestion selected!')
        $('#err-id').html('No suggestion selected!')
      }
  }

  const handleSuggestionClick = () => {
    $('#myModalses').animate({
     width: 'toggle'
    })
    $('#msysModales').animate({
     width: 'toggle'
    })
    $('#mys-sbsgs').animate({
     width: 'toggle'
    })
    $('#sssmsssyss-sbsgs').animate({
     width: 'toggle'
    })
  }

  async function fetchWishData(){
    const colRef = collection(db, 'wishlist')
    await onSnapshot(colRef, (snapshot) => {
      let prod_D = [];
  
      snapshot.docs.forEach((doces) => {
        prod_D.push({...doces.data(), id: doces.id}); 
      })
      
      setIsWishData(prod_D);   
    })
  }

  useEffect(() => {
    fetchWishData();
  }, []) 

  useEffect(() => {
    if(isWishData.length > 0){
      $('#pdls').text(isWishData.length)
      }else{
        $('#pdls').text('0')
      }
  }, [isWishData])

   const removeFromWishList = async (ev) => {
    await deleteDoc(doc(db, 'wishlist', ev.target.id))
                    .then((res) => {
                      toast.success('Removed from Wish List')
                    })
                    .catch((erros) => {
                      toast.error('Could notb delete from Wish List')
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

  async function activateCoupon (e) {
    const colRef = doc(db, "coupons", e.target.id);
    await updateDoc(colRef, {
      isActivated: 'activated'
    })
    .then((res) => {
      toast.success("Activated coupon successfully")
    })
    .catch((err) => {
      toast.error("Could not activate coupon")
    })
  }

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
    <div className='container-fluid' id='header'>
    <div className='backdrop-background' onClick={handleModales} id='my-bsg'></div>
    <div className='backdrop-background' onClick={handleMod} id='my-bsgs'></div>
    <div className='backdrop-background' onClick={handleMods} id='my-sbsgs'></div>
    <div className='backdrop-background' onClick={handleDom} id='mys-sbsgs'></div>
    <div className='backdrop-background' onClick={handleDoms} id='msys-sbsgs'></div>
    <div className='backdrop-background' onClick={handleDomss} id='smsys-sbsgs'></div>
    <div className='backdrop-background' onClick={handleCouponClick} id='ssmsys-sbsgs'></div>
    <div className='backdrop-background' onClick={handleSettingClick} id='sssmsys-sbsgs'></div>
    <div className='backdrop-background' onClick={handleSupportClick} id='sssmssys-sbsgs'></div>
    <div className='backdrop-background' onClick={handlePwoClick} id='sssmsssys-sbsgs'></div>
    <div className='backdrop-background' onClick={handleSuggestionClick} id='sssmsssyss-sbsgs'></div>

    <div className='modal' id='myModales'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2><span id='pdls'></span> MY WISH LIST</h2>
          </div>
          <div className='modal-body'>
          <div className='container-row' id='cart-scroll'>
                 {!!isWishData && isWishData.length > 0 
                 ? 
                 !!isWishData && isWishData.map((wsh) => {

                  return (
                    <div className='wish-row'>
                     <div>
                     <img src={!!wsh.prod_imeg ? wsh.prod_imeg : 'Nothing'} className='cart_img' alt='img_src'/>
                     </div>
                     <div>
                      <h5>{wsh.product_name}</h5>
                      <button className='add-to-crt' id={wsh.prod_Id} onClick={addToCart}>Add to cart</button>
                      <button className='add-to-wish' id={wsh.id} onClick={removeFromWishList}>Remove</button>
                     </div>
                    </div>    
                  );

                 })
                 :
                  <h2>Your wish list is empty</h2>
                 }
          </div>
          </div>
        </div>
      </div>
    </div>

    <div className='modal' id='myModaless'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2><span id='pdl'></span> MY CART</h2>
          </div>
          <div className='modal-body'>
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
                    <input type='button' className={crt.cartdata.sprice} value='+' onClick={handleAddProductCart} id={crt.id} style={{cursor: 'pointer'}}/>
                    <input type='number' className='cart-input' id={'crt-' + crt.id} style={{border: 'none', outline: 'none', cursor: 'not-allowed'}} placeholder='1' readOnly />
                    <input type='button' className={crt.cartdata.sprice} value='—' onClick={handleMinusProductCart} id={crt.id} style={{cursor: 'pointer'}}/> 
                    </div>
                    </div>
                    <input type='button' className='xlg-link' id={crt.id} onClick={handleDelete} value='X' style={{cursor: 'pointer'}}/> 
                    </div>    
                  );
                 })
                 :
                 <img src={Loading_icon} className='imgss' alt='Loading_icon'/>
                 }
                </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleMod}>Back</button>
            <button type='submit'  className='mod-btn btn-ord' id='mod-btn-grn' onClick={handleConfirmOrder}>Confirm Order</button>
          </div>
        </div>
      </div>
    </div>

    <div className='modal' id='myModal'>
      <div className='modal-dialog'>
        <div className='modal-content'>
        <h3 className='header-cart'>Review and Pay</h3>
          <div className='modal-body'> 
                <div className='modal-total'>
                  <p>Order Value</p>
                  <span id='fnlprc'>0.00 KES</span>
                </div>
                <div className='modal-total'> 
                  <p>Discount/Coupons</p>
                  <span style={{color: 'green'}} id='disoff'>0.00</span>
                </div>
                <div className='modal-total'>
                  <h5>Total</h5>
                  <h5 id='ttprc'>0.00 KES</h5>
                </div>
                <h3 className='header-cart'>Payment Method</h3>
                <div className='modal-pay'>
                 <button className='lipa'>
                 <div id='codl'>
                 <input type='checkbox' id='chks' name='method' value='cash' onChange={handleChecked}/>
                  Cash on Delivery
                 </div> 
                 </button> 
                </div>
                <div className='modal-pay' style={{marginTop: '5px'}} id='cod-pay'>
                <button className='lipa'><div><input type='checkbox' name='method' value='cash' onChange={handleChecked}/> Cash on Delivery</div> <icons.Wallet2 style={{fontSize: '20px'}}/></button>
                </div>
          </div>
          <input type='text' id='doc-id' value={!!isCartID && isCartID.map((crt) => crt.id )} hidden/>  
          <div className='modal-footer'>
           <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleConfirmOrder}>Back</button>
           <button type='submit'  className='mod-btn btn-ord' id='mod-btn-grn' onClick={handleOrder}>Place Order</button>
          </div>  
        </div>
      </div>
    </div>

    <div className='modal' id='myModalses'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>{!!user && user.username}</h2>
          </div>
          <div className='modal-body'>
            <div className='user-cols'>
                    <Link onClick={handleOrderClick} className='divs'>
                        <icons.Cart3 className='cart-icon'/>
                        <p>My Orders</p>
                    </Link>
                    <Link onClick={handleCouponClick} className='divs'>
                        <icons.CardText className='cart-icon'/>
                        <p>Coupons</p>
                    </Link>
            </div>
            <div className='user-cols'>
                    <Link onClick={handleSupportClick} className='div'>
                        <icons.Headset className='cart-icon'/>
                        <h3>Help and support</h3>
                    </Link>
            </div>
            <div className='user-cols'>
                    <Link onClick={handleSettingClick} className='div'>
                        <icons.GearFill className='cart-icon'/>
                        <h3>Settings</h3>
                    </Link>
            </div>
          </div>
          <div className='user-cols' id='logout'>
                    <Link className='div' onClick={handleSignOut}> 
                        <icons.BoxArrowRight className='cart-icon'/>
                        <h3 className='logout'>Logout</h3>
                    </Link>
          </div>
        </div>
      </div>
    </div>

    <div className='modal' id='myModalsess'>
      <div className='modal-dialog'>
        <div className='modal-content'>
        <h2>MY ORDERS</h2>
          <div className='modal-header' id='mod-hed'>
                  <Link className='ords'  onClick={handleActiveOrders} id={selectedOrd === 'active' ? 'bod' : 'nobod'}>
                    <p>Active</p>
                  </Link>
                  <Link className='ords' onClick={handleCompleteOrders} id={selectedOrd === 'complete' ? 'bod' : 'nobod'}>
                    <p>Completed</p>
                  </Link>
                  <Link className='ords' onClick={handleCanceledOrders} id={selectedOrd === 'cancelled' ? 'bod' : 'nobod'}>
                    <p>Cancelled</p>
                  </Link>
          </div>
          <div className='modal-body' id='mod-bod'>
              <div className={selectedOrd === 'active' ? 'bod' : 'nobod'} id='ord-list'>
               {!!isOrders && isOrders.map((ord) => {
               
                if(ord.userid !==  user.userid || ord.progress === 'cancelled' || ord.progress === 'delivered'){
                  return !ord; 
                }
             
                return (
                <Link className='ord-nav'>
                <div className='ord-nav-nav'>
                  <div className='row'>
                  <h4>INVOICE NO#</h4>
                  <h4>{ord.inovice}</h4>
                  </div>
                  <div className='row'>
                  <span>Due date:</span>
                  <span style={{color: 'gray'}}>{ord.calender}</span>
                  </div>
                  <div className='row'>
                    <div>
                     <span className={ord.progress === 'Pending' ? '' : 'nul'}><icons.ThreeDots className='badg'/></span>
                     <span className={ord.progress === 'in progress' ? '' : 'nul'}><icons.BarChartLineFill className='prog'/></span>
                     <span className={ord.progress === 'in route' ? '' : 'nul'}><icons.Truck className='rout'/></span>
                     <span className={ord.progress === 'delivered' ? '' : 'nul'}><icons.Check2Square className='deliv'/></span>
                     <span className={ord.progress === 'cancelled' ? '' : 'nul'}><icons.XCircleFill className='canc'/></span>
                    </div>
                    <div>
                     <span className={ord.progress === 'Pending' ? 'badg' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'in progress' ? 'prog' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'in route' ? 'rout' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'delivered' ? 'deliv' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'cancelled' ? 'canc' : 'nul'}>{ord.progress}</span>
                    </div>
                  </div>
                  <br/>
                  <input type='button' className='btn_ords' id={ord.id} onClick={handleOrderPrv} value='View Order'/>
                  <input type='button' className={ord.progress === 'cancelled' || ord.progress === 'delivered' ? 'btn_canc' : 'btn_ord' } id={ord.id} onClick={handleOrderDel} value='Cancel Order'/>
                </div>
                </Link>
                );
            
               })}
              </div>
            
              <div className={selectedOrd === 'complete' ? 'bod' : 'nobod'} id='ord-list'>
               {!!isOrders && isOrders.map((ord) => {
               
                if(ord.userid !==  user.userid || ord.progress !== 'delivered'){
                  return !ord; 
                }
             
                return (
                <Link className='ord-nav'>
                <div className='ord-nav-nav'>
                  <div className='row'>
                  <h4>INVOICE NO#</h4>
                  <h4>{ord.inovice}</h4>
                  </div>
                  <div className='row'>
                  <span>Due date:</span>
                  <span style={{color: 'gray'}}>{ord.calender}</span>
                  </div>
                  <div className='row'>
                    <div>
                     <span className={ord.progress === 'Pending' ? '' : 'nul'}><icons.ThreeDots className='badg'/></span>
                     <span className={ord.progress === 'in progress' ? '' : 'nul'}><icons.BarChartLineFill className='prog'/></span>
                     <span className={ord.progress === 'in route' ? '' : 'nul'}><icons.Truck className='rout'/></span>
                     <span className={ord.progress === 'delivered' ? '' : 'nul'}><icons.Check2Square className='deliv'/></span>
                     <span className={ord.progress === 'cancelled' ? '' : 'nul'}><icons.XCircleFill className='canc'/></span>
                    </div>
                    <div>
                     <span className={ord.progress === 'Pending' ? 'badg' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'in progress' ? 'prog' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'in route' ? 'rout' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'delivered' ? 'deliv' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'cancelled' ? 'canc' : 'nul'}>{ord.progress}</span>
                    </div>
                  </div>
                  <br/>
                  <input type='button' className='btn_ords' id={ord.id} onClick={handleOrderPrv} value='View Order'/>
                  <input type='button' className={ord.progress === 'cancelled' || ord.progress === 'delivered' ? 'btn_canc' : 'btn_ord' } id={ord.id} onClick={handleOrderDel} value='Cancel Order'/>
                </div>
                </Link>
                );
            
               })}
              </div>
            
              <div className={selectedOrd === 'cancelled' ? 'bod' : 'nobod'} id='ord-list'>
               {!!isOrders && isOrders.map((ord) => {
               
                if(ord.userid !==  user.userid || ord.progress !== 'cancelled'){
                  return !ord; 
                }
             
                return (
                <Link className='ord-nav'>
                <div className='ord-nav-nav'>
                  <div className='row'>
                  <h4>INVOICE NO#</h4>
                  <h4>{ord.inovice}</h4>
                  </div>
                  <div className='row'>
                  <span>Due date:</span>
                  <span style={{color: 'gray'}}>{ord.calender}</span>
                  </div>
                  <div className='row'>
                    <div>
                     <span className={ord.progress === 'Pending' ? '' : 'nul'}><icons.ThreeDots className='badg'/></span>
                     <span className={ord.progress === 'in progress' ? '' : 'nul'}><icons.BarChartLineFill className='prog'/></span>
                     <span className={ord.progress === 'in route' ? '' : 'nul'}><icons.Truck className='rout'/></span>
                     <span className={ord.progress === 'delivered' ? '' : 'nul'}><icons.Check2Square className='deliv'/></span>
                     <span className={ord.progress === 'cancelled' ? '' : 'nul'}><icons.XCircleFill className='canc'/></span>
                    </div>
                    <div>
                     <span className={ord.progress === 'Pending' ? 'badg' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'in progress' ? 'prog' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'in route' ? 'rout' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'delivered' ? 'deliv' : 'nul'}>{ord.progress}</span>
                     <span className={ord.progress === 'cancelled' ? 'canc' : 'nul'}>{ord.progress}</span>
                    </div>
                  </div>
                  <br/>
                  <input type='button' className='btn_ords' id={ord.id} onClick={handleOrderPrv} value='View Order'/>
                  <input type='button' className={ord.progress === 'cancelled' || ord.progress === 'delivered' ? 'btn_canc' : 'btn_ord' } id={ord.id} onClick={handleOrderDel} value='Cancel Order'/>
                </div>
                </Link>
                );
            
               })}
              </div>
        
          </div>
          <div className='modal-footer'>
            <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleOrderClick}>Back</button>
          </div>
        </div>
      </div>
    </div>

    <div className='modal' id='myModalsses'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2 style={{fontSize: '16px'}}>invoice no. #{isOrderData.inovice}</h2>
          </div>
          <div className='modal-body'>
          <div className='column'>
    <div className='col'> 
     <input type='radio' className='rd'  id={!!isOrderData ? isOrderData.progress === 'in progress' || isOrderData.progress === 'in route' || isOrderData.progress === 'delivered' ? 'chek' : 'no-chek' : 'no-chek'}  disabled/>
     <p>in progress</p>
    </div>
    <div className='col-line' id={!!isOrderData ? isOrderData.progress === 'in progress' || isOrderData.progress === 'in route' || isOrderData.progress === 'delivered' ? 'clrd' : '' : ''}></div>
    <div className='col'>
    <input type='radio' className='rd' id={!!isOrderData ? isOrderData.progress === 'in route' || isOrderData.progress === 'delivered' ? 'cheks' : 'no-cheks' : 'no-cheks'} disabled/>
    <p>in route</p>
    </div>
    <div className='col-line' id={!!isOrderData ? isOrderData.progress === 'in route' || isOrderData.progress === 'delivered' ? 'clrs' : '' : ''}></div>
    <div className='col'>
    <input type='radio' className='rd' id={!!isOrderData && isOrderData.progress === 'delivered' ? 'chekd' : 'no-chekd'} disabled/>
    <p>Delivered</p>
    </div>
    
    <p className='col-pr'>Products</p> 
    <div className='table'>
    <table>
      <tr>
        <th className='tr'>Product Name</th>
        <th className='tr'>Quantity</th>
        <th className='tr'>Final Price</th>
      </tr>
      {
      !!orderItem && orderItem.map((ord) => {
        return (
        <tr>
         <td className='tr'>{ord.name}</td>
         <td className='tr'>
          {!!isProd && isProd.map((prd) => {
             if(prd.name !== ord.name){
                return !prd;
             }
            const qty = parseInt(ord.amt.replace(/,/g,"")) / parseInt(prd.sprice);
            return qty;
          })}
         </td>
         <td className='tr'>{ord.amt}</td>
        </tr>
        );
      })
     }
    </table>
    </div>
    <div className='prc-col'>
    <div className='pr'>
      <h5>Discount</h5>
      <p>{!!isOrderData && isOrderData.discount}</p>
    </div>
    <hr/>
    <div className='pr'>
      <h4>Total Price</h4>
      <p>{!!isOrderData && isOrderData.total}</p>
    </div>
    </div>

          </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleDomRev}>Back</button>
          </div>
        </div>
      </div>
    </div>

    <div className='modal' id='myModalssesss'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>MY COUPONS</h2>
          </div>
          <div className='modal-body'>
          <div className='container-row' id='cart-scroll'>
                 {!!isCoupons && isCoupons.length > 0 
                 ? 
                 !!isCoupons && isCoupons.map((cpns) => {
                  
                  return (
                    <div className='wish-row'>
                      <h5 style={{color: "#000"}}>My Coupon</h5>
                     <div>
                      <button className={cpns.isActivated === "not activated" ? "add-to-crt" : "no-crt"} id={cpns.id} onClick={activateCoupon}>Activate Kes. {cpns.coupon}</button>
                      <h5 className={cpns.isActivated === "activated" ? "add-to-crts" : "no-crt"}>Activated</h5> 
                     </div>
                    </div>    
                  );

                 })
                 :
                  <h2>Your have no coupons</h2>
                 }
          </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleCouponClick}>Back</button>
          </div>
        </div>
      </div>
    </div>

    <div className='modal' id='myModasles'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>MY SETTINGS</h2>
          </div>
          <div className='modal-body'>
          <div className='mod'></div>
          <div className='modal-pay'>
       <button className='lipa'>
       <div>
         Phone number
       </div> 
       <icons.ChevronDown style={{fontSize: '20px'}} onClick={handlePhone}/>
       </button>
       <div id='fon'>
       <form onSubmit={submitPhoneNumber}>
       <div className='mpesa' style={{padding: '10px'}}>
        <p>New phone number</p>
        <div id='phone_code'>   
        <PhoneInput country={'ke'} name='phone' onChange={handlePhoneNumber} />
        </div>
        <button type='submit' className='tcode' id='address-btn'>Set</button>
       </div>
       </form>
       </div>
          </div>
          <div className='mod'></div>
          <div className='modal-pay'>
       <button className='lipa'>
       <div>
        Address
       </div> 
       <icons.ChevronDown style={{fontSize: '20px'}} onClick={handleLoc}/>
       </button> 
       <div id='loc'>
       <form onSubmit={handleAddressSubmit}>
       <div className='mpesa'>
        <p>Current City</p>
        <select className='tcode' name='city' onChange={handleAddress}>
    <option>Select</option>
    <option value="baringo">Baringo</option>
    <option value="bomet">Bomet</option>
    <option value="bungoma">Bungoma</option>
    <option value="busia">Busia</option>
    <option value="elgeyo marakwet">Elgeyo Marakwet</option>
    <option value="embu">Embu</option>
    <option value="garissa">Garissa</option>
    <option value="homa bay">Homa Bay</option>
    <option value="isiolo">Isiolo</option>
    <option value="kajiado">Kajiado</option>
    <option value="kakamega">Kakamega</option>
    <option value="kericho">Kericho</option>
    <option value="kiambu">Kiambu</option>
    <option value="kilifi">Kilifi</option>
    <option value="kirinyaga">Kirinyaga</option>
    <option value="kisii">Kisii</option>
    <option value="kisumu">Kisumu</option>
    <option value="kitui">Kitui</option>
    <option value="kwale">Kwale</option>
    <option value="laikipia">Laikipia</option>
    <option value="lamu">Lamu</option>
    <option value="machakos">Machakos</option>
    <option value="makueni">Makueni</option>
    <option value="mandera">Mandera</option>
    <option value="meru">Meru</option>
    <option value="migori">Migori</option>
    <option value="marsabit">Marsabit</option>
    <option value="mombasa">Mombasa</option>
    <option value="muranga">Muranga</option>
    <option value="nairobi">Nairobi</option>
    <option value="nakuru">Nakuru</option>
    <option value="nandi">Nandi</option>
    <option value="narok">Narok</option>
    <option value="nyamira">Nyamira</option>
    <option value="nyandarua">Nyandarua</option>
    <option value="nyeri">Nyeri</option>
    <option value="samburu">Samburu</option>
    <option value="siaya">Siaya</option>
    <option value="taita taveta">Taita Taveta</option>
    <option value="tana river">Tana River</option>
    <option value="tharaka nithi">Tharaka Nithi</option>
    <option value="trans nzoia">Trans Nzoia</option>
    <option value="turkana">Turkana</option>
    <option value="uasin gishu">Uasin Gishu</option>
    <option value="vihiga">Vihiga</option>
    <option value="wajir">Wajir</option>
    <option value="pokot">West Pokot</option>
        </select>
        <p>Location</p>
        <input type='text' className='tcode' name='location' placeholder={!!userAddress ? userAddress.location : 'Specify your current location'} onChange={handleAddress}/>
        <button type='submit' className='tcode' id='address-btn'>Set</button>
       </div>
       </form>
       </div>
          </div> 
          <br/>
          <br/>
          <br/>
          <div className='mod' style={{textAlign: 'center'}}>User information</div>
          <div className='modal-pay'>
          <div id='locs'>
          <span>{!!user && user.username !== '' ? user.username : 'Username not updated'}</span>
          <br/>
          <span>{!!user && user.email !== '' ? user.email : 'Email not updated'}</span>
          <br/>
          <span>{!!user && user.phonenumber !== '' ? user.phonenumber : 'Phone number not updated'}</span>
          <br/>
          <i>{!!userAddress && userAddress.city !== '' ? userAddress.city : 'City not updated'}</i>
          <br/>
          <i>{!!userAddress && userAddress.location !== '' ? userAddress.location : 'Location not updated'}</i>
          </div>
          </div>
          </div>
          <div className='modal-footer'>
          <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleSettingClick}>Back</button>
          </div>
        </div>
      </div>
    </div>

    <div className='modal' id='mysModales'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>How can we help you?</h2>
          </div>
          <div className='modal-body'>
                <div className='user-cols'>
                    <Link onClick={handlePwoClick} className='div'>
                        <icons.Cart3 className='cart-icon' style={{color: 'green', boxShadow : '0 0 1px 1px green', borderRadius: '50px', padding: '5px', border: 'none'}}/>
                        <h3>Problem with Order</h3>
                    </Link>
                </div>
                <div className='user-cols'>
                    <Link onClick={handleSuggestionClick} className='div'>
                        <icons.Lightbulb className='cart-icon' style={{color: '#ffe135', boxShadow : '0 0 1px 1px #ffe135', borderRadius: '50px', padding: '5px', border: 'none'}}/>
                        <h3>Suggestions</h3>
                    </Link>
                </div>
                <div className='user-cols'>
                    <Link className='div'>
                        <icons.Headset className='cart-icon' style={{color: 'purple', boxShadow : '0 0 1px 1px purple', borderRadius: '50px', padding: '5px', border: 'none'}}/>
                        <h3>Contact us</h3>
                    </Link>
                </div>
          </div>
          <div className='modal-footer'>
          <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleSupportClick}>Back</button>
          </div>
        </div>
      </div>
    </div>

    <div className='modal' id='msyModales'>
      <div className='modal-dialog'>
      <form onSubmit={handleSubmitQry}>
        <div className='modal-content'>
          <div className='modal-header'>
            <span id='qryerr-id' style={{color: 'red'}}></span> 
            <h2>Tick all that apply</h2>
          </div>
          <div className='modal-body'>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Late Order' name='qryone' onChange={handleChanges}/>
         <h3>Late Order</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Missing Products' name='qrytwo' onChange={handleChanges}/>
         <h3>Missing Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Expired Products' onChange={handleChanges}/>
         <h3>Expired Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Damaged Products' name='qrythree' onChange={handleChanges}/>
         <h3>Damaged Products</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Incorrect Product' name='qryfour' onChange={handleChanges}/>
         <h3>Incorrect Product</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Issue with invoice or Payment' name='qryfive' onChange={handleChanges}/>
         <h3>Issue with invoice or Payment</h3>
        </div>
    </div>
    <div className='user-cols'>
        <div className='div'>
        <textarea type='text' name='otherqry' onChange={handleChanges} style={{width: '100%', height: '80px', overflowY: 'auto', overflowX: 'none'}} placeholder='Optional...Any other issue?'></textarea>
        </div>
    </div>
          </div>
          <div className='modal-footer'>
          <button type='submit' className='mod-btn' id='mod-btn-grn'>Submit</button>
          <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handlePwoClick}>Back</button>
          </div>       
        </div> 
      </form>
      </div>
    </div>

    <div className='modal' id='msysModales'>
      <div className='modal-dialog'>
      <form onSubmit={handleSubmitSuggestions}>
        <div className='modal-content'>
          <div className='modal-header'>
            <span id='err-id' style={{color: 'red'}}></span> 
            <h2>Tick all that apply</h2>
          </div>
          <div className='modal-body'>
          <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Improve app experience' name='prblmone' onChange={handleChangess}/>
         <h3>Improve app experience</h3>
        </div>
          </div>
          <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Improve delivery service and time' name='prblmtwo' onChange={handleChangess}/>
         <h3>Improve delivery service and time</h3>
        </div>
          </div>
          <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Offer more products' name='prblmthree' onChange={handleChangess}/>
         <h3>Offer more products</h3>
        </div>
          </div>
          <div className='user-cols'>
        <div className='div'>
         <input type='checkbox' className='prblm' value='Improve reachability of information' name='prblmfour' onChange={handleChangess}/>
         <h3>Improve reachability of information</h3>
        </div>
          </div>
          <div className='user-cols'>
        <div className='div'>
        <textarea type='text' onChange={handleChangess} style={{width: '100%', height: '80px', overflowY: 'auto', overflowX: 'none'}} placeholder='Optional...Any other issue?' name='others'></textarea>
        </div>
          </div>
          </div>
          <div className='modal-footer'>
            <button type='submit' className='mod-btn' id='mod-btn-grn'>Submit</button>
            <button type='button' className='mod-btn' id='mod-btn-gry' onClick={handleSuggestionClick}>Back</button>
          </div>       
        </div>
      </form>
      </div>
    </div>

    <nav className='navbar' id='myNavbar'>
       <div className='navbar-logo'>
        <h2 className='logo'>
        <Link to='/dashboard' style={{color: '#fff', textDecoration: 'none'}}>
        ONLINESTORE
        </Link>
        </h2>
       </div>
       <div className='searchbar'>
        <input type='search' className='search' placeholder='Search ...' onClick={handleChange}/>
        <icons.Search className='search-icon'/>
       </div>
       <div className='user-profile'>
        <icons.Heart id='us-cns' onClick={handleModales}/>
        <icons.Basket2 id='us-cns' onClick={handleMod}/>
        <icons.Person  id='us-cns' onClick={handleDom}/>
       </div>    
    </nav>
    <div className={isModal ? 'open-modal' : 'close-modal'}>
    <div className='modal-content'>
          <div className='back-bg'>
            <Link onClick={handleCloseModal}>
             <icons.ChevronRight className='back'/>
            </Link> 
          <div className='searchbar'>
           <input type='search' className='search' placeholder='Search by product name...' onInput={handleChangeProduct}/>
          </div>
          </div>
          <div className='modal-body'>
            {!!filterData && filterData.map((filt) => {
              const sPrc = parseInt(filt.sprice)
              return (
                <Link className='ord-nav' id='fil'>
                   <div className='ord-nav-nav'>
                    <div className='row'>
                     <h4>{filt.name}</h4>
                     <code>KES</code>
                    </div>
                    <div className='row'>
                    <div>
                    <img src={!!filt.imeg ? filt.imeg : Loading_icon} className='cart_img' alt='img_src'/>
                    </div>
                    <div id='prc-loc'>{sPrc.toLocaleString()}</div>
                    </div>
                    <br/>
                    <input type='button' className='btn_ords' id={filt.id} onClick={handleViewProduct} value='View Product'/>
                   </div>
                </Link>
              );
            })}
          </div>
    </div>
    </div>
    <div className={isModals ? 'open-modal' : 'close-modal'}>
    <div className='modal-content'>
          <div className='back-bg'>
            <Link onClick={handleCloseModals}>
             <icons.ChevronRight className='back'/>
            </Link> 
          </div>
          <div className='modal-body'>
          <div className='modal-header'>
           <h1>{viewPrdt.name}</h1>
            <img src={!!viewPrdt ? viewPrdt.imeg : Loading_icon} alt='alt_product' id='alimgs'/>
          </div>  
            <p id='descr'>{viewPrdt.description}</p>
            <span style={{margin: '20px'}}></span> 
          </div>
          <div className='modal-footer'>
          <button type='submit'  className='mod-btn' id={viewPrdt.id} onClick={addToCart}>Add to cart</button>
          </div>
    </div>
    </div>
    </div>
  );

}

export default Header
