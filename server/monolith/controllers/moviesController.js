const Movie = require("../models/movies")

class MovieController {
  static async fetchMovies (req, res, next) {
    try {
      const movies = await Movie.findAll()
      res.status(200).json(movies)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async findSpesificMovie (req, res, next) {
    let id = req.params.id

    try {
      const movie = await Movie.findById(id)
      res.status(200).json(movie)
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
      popularity: parseFloat(req.body.popularity),
      tags: req.body.tags
    }

    if (req.body.tags) {
      newValue.tags = req.body.tags.split(' ').join('').split(',')
    }

    try {
      const addedMovie = await Movie.insert(newMovie)
      res.status(200).json(addedMovie)
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
      popularity: parseFloat(req.body.popularity),
      tags: req.body.tags
    }
    
    if (req.body.tags) {
      newValue.tags = req.body.tags.split(' ').join('').split(',')
    }

    // Untuk Patch
    for (const key in newValue) {
      if (newValue[key] === undefined) {
        delete newValue[key]
      } 
    }

    try {
      const movie = await Movie.editById(id, newValue)
      res.status(200).json(movie)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async deleteMovie (req, res, next) {
    let id = req.params.id

    try {
      const deleted = await Movie.deleteById(id)
      res.status(200).json(deleted)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MovieController