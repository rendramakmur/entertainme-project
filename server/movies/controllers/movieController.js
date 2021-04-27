const Movie = require('../models/movie')
const Redis = require('ioredis')
const redis = new Redis()

class MovieController {
  static async fetchMovies (req, res, next) {
    try {
      const moviesData = await redis.get('movies:data')
      if (!moviesData) {
        const movies = await Movie.findAll()
        await redis.set('movies:data', JSON.stringify(movies))
        res.status(200).json(movies)
      } else {
        res.status(200).json(JSON.parse(moviesData))
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async getSpesificMovie (req, res, next) {
    let id = req.params.id

    try {
      const spesificMovieData = await redis.get(`movie:id:${id}:data`)

      if (!spesificMovieData) {
        const movie = await Movie.findById(id)
        if (!movie) {
          next({ code: 404, message: 'Series not found.' })
        } else {
          await redis.set(`movie:id:${id}:data`, JSON.stringify(movie))
          res.status(200).json(movie)
        }
      } else {
        res.status(200).json(JSON.parse(spesificMovieData))
      }

    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async addMovie (req, res, next) {
    let newMovie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      newMovie.tags = req.body.tags.split(' ').join('').split(',')
    }

    if (req.body.popularity) {
      newMovie.popularity = parseFloat(req.body.popularity)
    }

    try {
      const addedMovie = await Movie.insert(newMovie)
      await redis.del('movies:data')
      res.status(200).json(addedMovie.ops[0])
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async editMovie (req, res, next) {
    let id = req.params.id
    let newValue = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    
    if (req.body.tags && typeof req.body.tags === 'string') {
      newValue.tags = req.body.tags.split(' ').join('').split(',')
    }
    
    if (req.body.popularity) {
      newValue.popularity = parseFloat(req.body.popularity)
    }

    // Untuk Patch
    for (const key in newValue) {
      if (newValue[key] === undefined) {
        delete newValue[key]
      } 
    }

    try {
      const movie = await Movie.editById(id, newValue)
      await redis.del('movies:data')
      if (movie.lastErrorObject.n === 0) {
        next({ code: 404, message: 'Series not found.' })
      } else {
        res.status(200).json(movie.value)
      }

    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async deleteMovie (req, res, next) {
    let id = req.params.id

    try {
      const deleted = await Movie.deleteById(id)
      await redis.del('movies:data')

      if (deleted.lastErrorObject.n === 0) {
        next({ code: 404, message: 'Series not found.' })
      } else {
        res.status(200).json(deleted.value)
      }

    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MovieController