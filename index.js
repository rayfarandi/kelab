require('dotenv').config({
    path:'./.env'
})

global.path = __dirname

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors())
// app.use('/uploads/users', express.static('uploads/users'))

//split code
app.use('/',require('./src/routers'))

app.get('/',(req,res)=>{
    return res.json({
        success: true,
        message: 'Backend is running'
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Backend is running on port ${process.env.PORT}`)
})