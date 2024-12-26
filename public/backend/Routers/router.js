const router_express = require('express')
const router_app = router_express()
const morgan = require('morgan');
const cors = require('cors')

//middleware
router_app.use(morgan('dev'))

//connect to frontend
router_app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

//firebase admin control 
const Auth = require("../Config/firebaseConfig.js")

//url extenders
router_app.use(router_express.urlencoded({limit : '50mb', extended: false}))
router_app.use(router_express.json({limit : '50mb'}))

//get all users
router_app.get('/allusers', (req, res) => {
   try{
    Auth.listUsers()
    .then((rest) => {
        return res.json({
            success: rest
        })
    })
    .catch((err) => {
        return res.json({
            error : err.message
        })
    })
   }catch(err){
    return res.json({
        error: err.message
    })
   }
})

//delete user
router_app.post('/dltuser', (req, res) => {
    try{
    const uid = req.body.userID;
    Auth.deleteUser(uid)
        .then((result) => {
          return res.json({
            success: 'success'
          })
         })
        .catch(err => {
          console.log(err.message)
          return res.json({error: err.message})
         })   
    }catch(errors){
        return res.json({
            error : errors.message
        })
    }
})

//change user phone number 
router_app.post('/contacts', (req, res) => {
    try{
        Auth.updateUser(req.body.userid.toString(), {
                phoneNumber: req.body.phonenumber
             })
             .then((result) => {
                res.json({
                    success: 'success'
                })
             })
             .catch((errs) => {
                res.json({
                    error: errs.message
                })
             })
    }catch(errr){
        res.json({
            error: errr.message
        })
    }
})
 
module.exports = router_app