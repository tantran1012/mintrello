import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 2147 // 21:47

app.get('/', function (req, res) {
  res.send('<h1>Hello world~~!!! this is the backend of my Trello project</h1>')
})

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`)
})
