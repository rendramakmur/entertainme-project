const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const SeriesResolver = {
  Query: {
    tvSeries: async () => {
      try {
        const seriesCache = await redis.get('seriesOrchestrator:data')

        if (!seriesCache) {
          const series = await axios.get(`http://18.212.165.45:4002/series`)
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
          const series = await axios.get(`http://18.212.165.45:4002/series/${args.id}`)
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
    addSeries: async (_, args) => {
      const newSeries = {
        title: args.newSeries.title,
        overview: args.newSeries.overview,
        poster_path: args.newSeries.poster_path,
        popularity: args.newSeries.popularity,
        tags: args.newSeries.tags
      }

      const addedSeries = await axios.post('http://18.212.165.45:4002/series', newSeries)
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

      const editedSeries = await axios.put(`http://18.212.165.45:4002/series/${args.id}`, editedSeriesValue)
      await redis.del('seriesOrchestrator:data')
      await redis.del(`series-${args.id}:data`)
      return editedSeries.data
    },
    deleteSeries: async (_, args) => {
      const deletedSeries = await axios.delete(`http://18.212.165.45:4002/series/${args.id}`)
      await redis.del('seriesOrchestrator:data')
      await redis.del(`series-${args.id}:data`)
      return deletedSeries.data
    }
  }
}

module.exports = { SeriesResolver }