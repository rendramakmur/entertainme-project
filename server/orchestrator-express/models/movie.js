const axios = require('axios')

const baseUrl = 'http://localhost:4001'

class Movie {
  static fetchMovies() {
    return axios.get(`${baseUrl}/movies`)
  }
}

module.exports = Movie