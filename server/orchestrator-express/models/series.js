const axios = require('axios')

const baseUrl = 'http://localhost:4002'

class Series {
  static fetchSeries() {
    return axios.get(`${baseUrl}/series`)
  }
}

module.exports = Series