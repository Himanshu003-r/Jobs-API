require('dotenv').config()
const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
const authenticateUser = require('./middleware/authentication')
const connectDB = require('./db/connect')

// error handler
const notFoundMidleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorhandler')

app.use(express.json())

// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)

app.use(notFoundMidleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5200
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`On server ${port}`))
        
    } catch (error) { 
        console.log(error)
    }
}

start()