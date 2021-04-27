const Series = require("../models/series")
const Redis = require('ioredis')
const redis = new Redis()

class SeriesController {
  static async fetchSeries (req, res, next) {
    try {
      const seriesData = await redis.get('series:data')

      if (!seriesData) {
        const series = await Series.findAll()
        await redis.set('series:data', JSON.stringify(series))
        res.status(200).json(series)
      } else {
        res.status(200).json(JSON.parse(seriesData))
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  
  static async getSpesificSeries (req, res, next) {
    const id = req.params.id

    try {
      const spesificSeriesData = await redis.get(`series:id:${id}:data`)

      if (!spesificSeriesData) {
        const series = await Series.findById(id)
        if (!series) {
          next({ code: 404, message: 'Series not found.' })
        } else {
          await redis.set(`series:id:${id}:data`, JSON.stringify(series))
          res.status(200).json(series)
        }
      } else {
        res.status(200).json(JSON.parse(spesificSeriesData))
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async addSeries (req, res, next) {
    let newSeries = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      newSeries.tags = req.body.tags.split(' ').join('').split(',')
    }
    
    if (req.body.popularity) {
      newSeries.popularity = parseFloat(req.body.popularity)
    }

    try {
      const series = await Series.insert(newSeries)
      await redis.del('series:data')
      res.status(201).json(series.ops[0])
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async editSeries (req, res, next) {
    let id = req.params.id
    let editedSeries = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      editedSeries.tags = req.body.tags.split(' ').join('').split(',')
    }
    
    if (req.body.popularity) {
      editedSeries.popularity = parseFloat(req.body.popularity)
    }

    console.log(editedSeries);

    for (const key in editedSeries) {
      if (editedSeries[key] === undefined) {
        delete editedSeries[key]
      } 
    }

    try {
      const series = await Series.editById(id, editedSeries)
      await redis.del('series:data')

      if (series.lastErrorObject.n === 0) {
        next({ code: 404, message: 'Series not found.' })
      } else {
        res.status(200).json(series.value)
      }
      
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async deleteSeries (req, res, next) {
    const id = req.params.id

    try {
      const series = await Series.deleteById(id)
      await redis.del('series:data')

      if (series.lastErrorObject.n === 0) {
        next({ code: 404, message: 'Series not found.' })
      } else {
        res.status(200).json(series.value)
      }

    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = SeriesController