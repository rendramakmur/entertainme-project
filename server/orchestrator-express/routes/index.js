const orchestratorController = require('../controllers/orchestratorController')

const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Welcome to entertainme orchectrator API.')
})

router.get('/entertainme', orchestratorController.fetchAll)

module.exports = router