const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const MovieResolver = {
  Query: {
    movies: async () => {
      try {
        const moviesCache = await redis.get('moviesOrchestrator:data')

        if (!moviesCache) {
          const movies = await axios.get(`http://18.212.165.45:4001/movies`)
          await redis.set('moviesOrchestrator:data', JSON.stringify(movies.data))
          return movies.data
        } else {
          return JSON.parse(moviesCache)
        }
      } catch (err) {
        console.log(err);
      }
    },
    movie: async (_, args) => {
      try {
        const movieByIdCache = await redis.get(`movie-${args.id}:data`)

        if (!movieByIdCache) {
          const movie = await axios.get(`http://18.212.165.45:4001/movies/${args.id}`)
          await redis.set(`movie-${args.id}:data`, JSON.stringify(movie.data))
          return movie.data
        } else {
          return JSON.parse(movieByIdCache)
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      const newMovie = {
        title: args.newMovie.title,
        overview: args.newMovie.overview,
        poster_path: args.newMovie.poster_path,
        popularity: args.newMovie.popularity,
        tags: args.newMovie.tags
      }
      
      const addedMovie = await axios.post('http://18.212.165.45:4001/movies', newMovie)
      await redis.del('moviesOrchestrator:data')
      return addedMovie.data
    },
    editMovie: async (_, args) => {
      const editedMovieValue = {
        title: args.editedMovie.title,
        overview: args.editedMovie.overview,
        poster_path: args.editedMovie.poster_path,
        popularity: args.editedMovie.popularity,
        tags: args.editedMovie.tags
      }

      const editedMovie = await axios.put(`http://18.212.165.45:4001/movies/${args.id}`, editedMovieValue)
      await redis.del('moviesOrchestrator:data')
      await redis.get(`movie-${args.id}:data`)
      return editedMovie.data
    },
    deleteMovie: async (_,args) => {
      const deletedMovie = await axios.delete(`http://18.212.165.45:4001/movies/${args.id}`)
      await redis.del('moviesOrchestrator:data')
      await redis.get(`movie-${args.id}:data`)
      return deletedMovie.data
    }
  }
}

module.exports = { MovieResolver }