const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const { connectMongodb } = require('./config/mongodb')
const errHandler = require('./middlewares/errHandler')
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
connectMongodb((connect) => {
  if (connect) console.log('MongoDB database connected!');
  else console.log('Connect to MongoDB error.');
})
app.use(router)
app.use(errHandler)

app.listen(port, () => {
  console.log(`Series server listening on port ${port}`);
})