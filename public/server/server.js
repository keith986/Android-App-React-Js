const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.listen ('5000', (err) => {
    if (err) throw err;
    console.log('Server is running')
})