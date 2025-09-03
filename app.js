require('dotenv').config()
const express = require('express')
// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const ratelimit = require('express-rate-limit')
const app = express()
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
const authenticateUser = require('./middleware/authentication')
const connectDB = require('./db/connect')

// error handler
const notFoundMidleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorhandler')

app.set('trust proxy', 1) // for reverse proxy
app.use(ratelimit({
    windowMs: 15 * 60 * 1000, // limit of 15 minutes
    max: 100, // limit each IP to 100 requests per window
}))
app.use(express.json())
app.use(helmet())
app.use(cors())  // Cross Origin Resource Sharing
app.use(xss())   // xross side scripting
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