const express = require('express')
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errHandler)

app.listen(port, () => {
  console.log(`Orchestrator server listening on port ${port}`);
})