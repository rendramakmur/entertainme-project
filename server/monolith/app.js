const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const { connectMongodb } = require('./config/mongodb')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
connectMongodb((connected) => {
  if (connected) console.log('MongoDB successfully connected!');
  else console.log('Connected to MongoDB error.');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})