const MovieController = require('../controllers/movieController')

const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Welcome to entertainme movies API.')
})

router.get('/movies/', MovieController.fetchMovies)
router.get('/movies/:id', MovieController.getSpesificMovie)
router.post('/movies/', MovieController.addMovie)
router.put('/movies/:id', MovieController.editMovie)
router.delete('/movies/:id', MovieController.deleteMovie)

module.exports = router