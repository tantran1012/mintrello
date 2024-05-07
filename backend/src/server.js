/* eslint-disable no-console */
/* eslint-disable-next-line no-console */
import AsyncExitHook from 'async-exit-hook'
import express from 'express'
import getEnv from './config/environment'
import { CLOSE_DB, CONNECT_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = getEnv('APP_HOST')
  const port = getEnv('APP_PORT')

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`Hello world, I am running at ${hostname}:${port}/`)
  })

  AsyncExitHook(() => {
    CLOSE_DB()
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
