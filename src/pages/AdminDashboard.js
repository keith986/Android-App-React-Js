import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import * as icons from 'react-bootstrap-icons'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  CategoryScale,  registerables } from "chart.js";
import { Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,  ...registerables);

const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [isJan, setIsJan] = useState([]);
  const [isFeb, setIsFeb] = useState([]);
  const [isMar, setIsMar] = useState([]);
  const [isApr, setIsApr] = useState([]);
  const [isMay, setIsMay] = useState([]);
  const [isJun, setIsJun] = useState([]);
  const [isJul, setIsJul] = useState([]);
  const [isAug, setIsAug] = useState([]);
  const [isSep, setIsSep] = useState([]);
  const [isOct, setIsOct] = useState([]);
  const [isNov, setIsNov] = useState([]);
  const [isDec, setIsDec] = useState([]);
  const [isXAxis, setIsXAxis] = useState('');
  const [isYAxis, setIsYAxis] = useState('');

  const fetchAllUsers = async () => {
    await Axios.get('/allusers')
               .then((resp) => {
                if(resp.data.success){
                 setAllUsers(resp.data.success.users)
                }
                if(resp.data.error){
                  toast.error(resp.data.error)
                }
               })
               .catch((err) => toast.error(err.message))
  }

  const fetchAllProducts = async () => {
    const colRef = collection(db, 'products')
    await onSnapshot(colRef, (snapshot) => {
      let all_prod = [];
      snapshot.docs.forEach((snap) => {
          all_prod.push(snap.data())
      })
      setAllProducts(all_prod)
    })
  }

  const fetchAllOrders = async () => {
    const colRef = collection(db, 'orders')
    await onSnapshot(colRef, (snapshot) => {
      let all_ord = [];
      snapshot.docs.forEach((snap) => {
          all_ord.push(snap.data())
      })
      setAllOrders(all_ord)
    })
  }
   
  const ordersByMonth = () => {
    
    let jan = ['0']
    let janttl = 0
    let feb = ['0']
    let febttl = 0
    let mar = ['0']
    let marttl = 0
    let apr = ['0']
    let aprttl = 0
    let may = ['0']
    let mayttl = 0
    let jun = ['0']
    let junttl = 0
    let jul = ['0']
    let julttl = 0
    let aug = ['0']
    let augttl = 0
    let sep = ['0']
    let septtl = 0
    let oct = ['0']
    let octttl = 0
    let nov = ['0']
    let novttl = 0
    let dec = ['0']
    let decttl = 0

    allOrders.forEach((ords) => {
      if(ords.due_year.toString() === new Date().getFullYear().toString()){
      if(ords.due_month.toString() === '1'){
           jan.push(ords.total) 
      }else if(ords.due_month.toString() === '2'){
           feb.push(ords.total)
      }else if(ords.due_month.toString() === '3'){
           mar.push(ords.total)
      }else if(ords.due_month.toString() === '4'){
           apr.push(ords.total)
      }else if(ords.due_month.toString() === '5'){
           may.push(ords.total)
      }else if(ords.due_month.toString() === '6'){
           jun.push(ords.total)
      }else if(ords.due_month.toString() === '7'){
           jul.push(ords.total)
      }else if(ords.due_month.toString() === '8'){
           aug.push(ords.total)
      }else if(ords.due_month.toString() === '9'){
           sep.push(ords.total)
      }else if(ords.due_month.toString() === '10'){
           oct.push(ords.total)
      }else if(ords.due_month.toString() === '11'){
           nov.push(ords.total)
      }else if(ords.due_month.toString() === '12'){
           dec.push(ords.total)
      }
      }
    })

    for(let i= 0; i < jan.length; i++){
      janttl += parseInt(jan[i].replace(/,/g, ''))
    }
    setIsJan(janttl)

    for(let i= 0; i < feb.length; i++){
      febttl += parseInt(feb[i].replace(/,/g, ''))
    }
    setIsFeb(febttl)

    for(let i= 0; i < mar.length; i++){
      marttl += parseInt(mar[i].replace(/,/g, ''))
    }
    setIsMar(marttl)

    for(let i= 0; i < apr.length; i++){
      aprttl += parseInt(apr[i].replace(/,/g, ''))
    }
    setIsApr(aprttl)

    for(let i= 0; i < may.length; i++){
      mayttl += may[i]
    }
    setIsMay(mayttl)

    for(let i= 0; i < jun.length; i++){
      junttl += parseInt(jun[i].replace(/,/g, ''))
    }
    setIsJun(junttl)

    for(let i= 0; i < jul.length; i++){
      julttl += parseInt(jul[i].replace(/,/g, ''))
    }
    setIsJul(julttl)

    for(let i= 0; i < aug.length; i++){
      augttl += parseInt(aug[i].replace(/,/g, ''))
    }
    setIsAug(augttl)

    for(let i= 0; i < sep.length; i++){
      septtl += parseInt(sep[i].replace(/,/g, ''))
    }
    setIsSep(septtl)

    for(let i= 0; i < oct.length; i++){
      octttl += parseInt(oct[i].replace(/,/g, ''))
    }
    setIsOct(octttl)

    for(let i= 0; i < nov.length; i++){
      novttl += parseInt(nov[i].replace(/,/g, ''))
    }
    setIsNov(novttl)

    for(let i= 0; i < dec.length; i++){
      decttl += parseInt(dec[i].replace(/,/g, ''))
    }
    setIsDec(decttl)
  }

  const chartData = () => {
    let xValues = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let yValues = [isJan.toString(), isFeb.toString(), isMar.toString(), isApr.toString(), isMay.toString(), isJun.toString(), isJul.toString(), isAug.toString(), isSep.toString(), isOct.toString(), isNov.toString(), isDec.toString()]
    setIsXAxis(xValues)
    setIsYAxis(yValues)
    console.log(yValues)
  }

  useEffect(() => {
    ordersByMonth()
    chartData()
  })

  useEffect(() => {
    fetchAllUsers()
    fetchAllProducts()
    fetchAllOrders()
  }, [])

  return (
    <div className='container-fluid' id='cont-fd'>
    <div className='dash-brd'>
      <div className='rows' id='ro-w'>
         <div className='col-3' id='clr1'>
           <span>ALL USERS</span>
           <div className='alt'>
           <h2>{!!allUsers ? allUsers.length - 1 : '0'}</h2>
           <icons.PeopleFill className='alt-icn'/>  
           </div>
         </div>
         <div className='col-3' id='clr2'>
           <span>ALL PRODUCTS</span>
           <div className='alt'>
           <h2>{!!allProducts && allProducts.length}</h2>
           <icons.Basket2 className='alt-icn'/>  
           </div>
         </div>
         <div className='col-3' id='clr3'>
           <span>ALL ORDERS</span>
           <div className='alt'>
           <h2>{!!allOrders && allOrders.length}</h2>
           <icons.ListOl to={'/allorders'} className='alt-icn'/>  
           </div>
         </div>       
      </div>
      <br/>
      <div className='rows' id='ro-w'>
      <h3 className='m-s'>{new Date().getFullYear()} Monthly sales</h3>
      </div>
      <div className='rows' id='ro-w'>
       <div className='col-33'>
       <Bar
          data={{
            labels: isXAxis,
            datasets: [{
              label: 'Monthly sales in Ksh',
              data: isYAxis,
              backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 205, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(20, 213, 237, 0.2)',
               'rgba(201, 203, 213, 0.2)',
               'rgba(201, 203, 207, 0.2)',
               'rgba(201, 203, 27, 0.2)',
               'rgba(201, 23, 207, 0.2)',
               'rgba(21, 210, 207, 0.2)'             
              ],
              borderWidth: 1
            }]
          }}

          options= {{
            scales : {
              x : {
                grid : {
                  drawOnChartArea : false
                }
              },
              y : {
                beginAtZero : true,
                grid : {
                  drawOnChartArea : false
                }
              }
            }
          }}

          height={100} 
          className='bar-chart'     
        />
       </div>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard
