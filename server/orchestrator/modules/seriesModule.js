const { createModule } = require('graphql-modules')
const { Series } = require('../typeDefs/series.type')
const { SeriesResolver } = require('../reslovers/seriesResolver')

const SeriesModule = createModule({
  id: 'series-module',
  dirname: __dirname,
  typeDefs: [Series],
  resolvers: [SeriesResolver]  
})

module.exports = { SeriesModule }