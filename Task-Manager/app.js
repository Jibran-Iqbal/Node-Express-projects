const express = require('express');

require('dotenv').config()
const app = express()
const port = 3000
const tasks = require('./routes/tasks')
const connnectDB = require('./db/connect');
const connectDB = require('./db/connect');


const notFound = require('./middleware/not-found')

const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware

app.use(express.json())




//routes






app.use('/api/v1/tasks',tasks)

app.use(notFound)

app.use(errorHandlerMiddleware)



app.get('/hello',(req,res)=>{
    res.send('Task Manager app')
})

const start = async()=>{
    try{
        console.log("Hello")
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening to port ${port}`))
    }
    catch(err){
        console.log(err)
    }
    // 
    // 
    // Now if there's any problem with the connection with the database then we will get the error 
    // 
}



start ()

