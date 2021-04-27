const { createApplication } = require('graphql-modules')
const { MovieModule } = require('../modules/movieModule')
const { SeriesModule } = require('../modules/seriesModule')

const application = createApplication({
  modules: [MovieModule, SeriesModule]
})

module.exports = { application }