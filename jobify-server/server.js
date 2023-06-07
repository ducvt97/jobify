import express from 'express'
import env from 'dotenv'

import notFoundMiddleware from './not-found.js'
import errorHandlerMiddleware from './error-handler.js'
import connectDB from './db/connect.js'

const app = express()
env.config()
const port = process.env.PORT || 7000

app.get('/', (req, res) => res.send('Welcome'))
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
