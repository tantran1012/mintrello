/* eslint-disable no-console */

import AsyncExitHook from 'async-exit-hook'
import express from 'express'
import getEnv from './config/environment'
import { CLOSE_DB, CONNECT_DB } from './config/mongodb'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { APIs_V1 } from './routes/v1'

const START_SERVER = () => {
  const app = express()

  const hostname = getEnv('APP_HOST')
  const port = getEnv('APP_PORT')

  //Enable req.body json data
  app.use(express.json())

  //Use API V1
  app.use('/v1', APIs_V1)

  //Middleware xử lý lỗi
  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(`Hello world, I am running at http://${hostname}:${port}`)
  })

  AsyncExitHook(() => {
    CLOSE_DB()
    console.log('server is shutting down')
  })
}

// Một cách connect & start server
;(async () => {
  try {
    await CONNECT_DB()
    console.log('Connected to MongoDB')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

//Chỉ khi connect Database thành công thì mới start server
// Một cách connect & start server
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
