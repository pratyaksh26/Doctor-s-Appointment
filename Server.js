const express = require('express')
const colors=require('colors')
const morgan = require('morgan')
const dotenv= require('dotenv')
const connectdb = require('./config/db')


//rst objects

const  app=express()

connectdb()
//midlewares

app.use(express.json())
app.use(morgan('dev'))

//routes

// app.get('/',(req,res)=>{
//     res.status(200).send({
//         message: 'server running'
//     });
// });

app.use('/api/v1/user',require("./routes/userRoutes"))



//listne
const port= process.env.PORT || 8080

app.listen(port , ()=>{
    console.log('server is running on port ');
});