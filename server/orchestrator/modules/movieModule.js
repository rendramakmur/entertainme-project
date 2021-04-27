const { createModule } = require('graphql-modules')
const { Movie } = require('../typeDefs/movie.type')
const { MovieResolver } = require('../reslovers/movieResolver')

const MovieModule = createModule({
  id: 'movie-module',
  dirname: __dirname,
  typeDefs: [Movie],
  resolvers: [MovieResolver]
})

module.exports = { MovieModule }