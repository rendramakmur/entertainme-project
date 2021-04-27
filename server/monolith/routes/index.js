const router = require('express').Router()
const movies = require('./moviesRoutes')
const series = require('./seriesRoutes')

router.use('/movies', movies)
router.use('/series', series)

module.exports = router