const SeriesController = require('../controllers/seriesController')

const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Welcome to entertainme series API.')
})

router.get('/series/', SeriesController.fetchSeries)
router.post('/series/', SeriesController.addSeries)
router.get('/series/:id', SeriesController.getSpesificSeries)
router.put('/series/:id', SeriesController.editSeries)
router.delete('/series/:id', SeriesController.deleteSeries)

module.exports = router