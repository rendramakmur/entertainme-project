const { gql } = require('graphql-modules')

const Movie = gql`
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

  type Query {
    movies: [Movie]
    movie(id: ID): Movie 
  }

  type Mutation {
    addMovie(newMovie: MovieInput) : Movie
    editMovie(id: ID, editedMovie: MovieInput) : Movie
    deleteMovie(id: ID) : Movie
  }
`

module.exports = { Movie }