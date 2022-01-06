const connectToMongo = require('./db')
connectToMongo();
const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
const port = 5000
app.use(express.json())

//Available routes

app.use('/api/auth',require('./route/auth'))
app.use('/api/notes',require('./route/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 

