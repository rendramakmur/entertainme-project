const { gql } = require('graphql-modules')

const Series = gql`
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

  extend type Query {
    tvSeries: [Series]
    series(id: ID): Series
  }

  extend type Mutation {
    addSeries(newSeries: SeriesInput) : Series
    editSeries(id: ID, editedSeries: SeriesInput) : Series
    deleteSeries(id: ID) : Series
  }
`

module.exports = { Series }