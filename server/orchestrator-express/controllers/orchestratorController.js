const Movie = require('../models/movie')
const Series = require('../models/series')
const Redis = require('ioredis')
const redis = new Redis()

class orchestratorController {
  static async fetchAll (req, res, next) {
    try {
      const orchestratorData = await redis.get('orchestrators:data')
      if (!orchestratorData) {
        const movies = Movie.fetchMovies()
        const series = Series.fetchSeries()
        let data = await Promise.all([movies, series])
        const orchestrator = {
          movies: data[0].data,
          tvSeries: data[1].data
        }

        await redis.set('orchestrators:data', JSON.stringify(orchestrator))

        res.status(200).json(orchestrator)
      } else {
        res.status(200).json(JSON.parse(orchestratorData))
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = orchestratorController