const MovieController = require('../controllers/moviesController')

const router = require('express').Router()

router.get('/', MovieController.fetchMovies)
router.get('/:id', MovieController.findSpesificMovie)
router.post('/', MovieController.addMovie)
router.put('/:id', MovieController.editMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router