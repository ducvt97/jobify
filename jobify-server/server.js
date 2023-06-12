import express from 'express'
import 'express-async-errors'
import env from 'dotenv'
import cors from 'cors'

import notFoundMiddleware from './not-found.js'
import errorHandlerMiddleware from './error-handler.js'
import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobRoutes.js'
import morgan from 'morgan'

const app = express()
env.config()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('combined'))
}

const port = process.env.PORT || 7000

app.use(cors())
app.use(express.json()) // make json data available in controllers

app.get('/', (req, res) => res.send('Welcome'))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
