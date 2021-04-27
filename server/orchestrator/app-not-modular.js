const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input SeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie 
    tvSeries: [Series]
    series(id: ID): Series
  }

  type Mutation {
    addMovie(newMovie: MovieInput) : Movie
    editMovie(id: ID, editedMovie: MovieInput) : Movie
    deleteMovie(id: ID) : Movie
    addSeries(newSeries: SeriesInput) : Series
    editSeries(id: ID, editedSeries: SeriesInput) : Series
    deleteSeries(id: ID) : Series
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const moviesCache = await redis.get('moviesOrchestrator:data')

        if (!moviesCache) {
          const movies = await axios.get(`http://localhost:4001/movies`)
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
          const movie = await axios.get(`http://localhost:4001/movies/${args.id}`)
          await redis.set(`movie-${args.id}:data`, JSON.stringify(movie.data))
          return movie.data
        } else {
          return JSON.parse(movieByIdCache)
        }
      } catch (err) {
        console.log(err);
      }
    },
    tvSeries: async () => {
      try {
        const seriesCache = await redis.get('seriesOrchestrator:data')

        if (!seriesCache) {
          const series = await axios.get(`http://localhost:4002/series`)
          await redis.set('seriesOrchestrator:data', JSON.stringify(series.data))
          return series.data
        } else {
          return JSON.parse(seriesCache)
        }
      } catch (err) {
        console.log(err);
      }
    },
    series: async (_, args) => {
      try {
        const seriesByIdCache = await redis.get(`series-${args.id}:data`)

        if (!seriesByIdCache) {
          const series = await axios.get(`http://localhost:4002/series/${args.id}`)
          await redis.set(`series-${args.id}:data`, JSON.stringify(series.data))
          return series.data
        } else {
          return JSON.parse(seriesByIdCache)
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
      
      const addedMovie = await axios.post('http://localhost:4001/movies', newMovie)
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

      const editedMovie = await axios.put(`http://localhost:4001/movies/${args.id}`, editedMovieValue)
      await redis.del('moviesOrchestrator:data')
      await redis.get(`movie-${args.id}:data`)
      return editedMovie.data
    },
    deleteMovie: async (_,args) => {
      const deletedMovie = await axios.delete(`http://localhost:4001/movies/${args.id}`)
      await redis.del('moviesOrchestrator:data')
      await redis.get(`movie-${args.id}:data`)
      return deletedMovie.data
    },
    addSeries: async (_, args) => {
      const newSeries = {
        title: args.newSeries.title,
        overview: args.newSeries.overview,
        poster_path: args.newSeries.poster_path,
        popularity: args.newSeries.popularity,
        tags: args.newSeries.tags
      }

      const addedSeries = await axios.post('http://localhost:4002/series', newSeries)
      await redis.del('seriesOrchestrator:data')
      return addedSeries.data
    },
    editSeries: async (_, args) => {
      const editedSeriesValue = {
        title: args.editedSeries.title,
        overview: args.editedSeries.overview,
        poster_path: args.editedSeries.poster_path,
        popularity: args.editedSeries.popularity,
        tags: args.editedSeries.tags
      }

      const editedSeries = await axios.put(`http://localhost:4002/series/${args.id}`, editedSeriesValue)
      await redis.del('seriesOrchestrator:data')
      await redis.del(`series-${args.id}:data`)
      return editedSeries.data
    },
    deleteSeries: async (_, args) => {
      const deletedSeries = await axios.delete(`http://localhost:4002/series/${args.id}`)
      await redis.del('seriesOrchestrator:data')
      await redis.del(`series-${args.id}:data`)
      return deletedSeries.data
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Orchestrator server listening at ${url}`);
});