const express = require('express')
const app = express()
const cors = require('cors')
const userRouters = require('./Routers/router')
const morgan = require('morgan')

//middleware
app.use(morgan('dev'))

app.use('/', userRouters)

const port = 7000;

app.listen (port, (err) => {
    if (err) throw err;
    console.log('Server is running @ port : ' + port)
}) 