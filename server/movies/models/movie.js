const { getDatabase } = require("../config/mongodb")
const { ObjectId } = require('mongodb')

const collectionMovies = 'movies'

class Movie {
  static findAll () {
    return getDatabase().collection(collectionMovies).find().toArray()
  }

  static findById (id) {
    return getDatabase().collection(collectionMovies).findOne({
      _id: ObjectId (id)
    })
  }

  static insert (payload) {
    return getDatabase().collection(collectionMovies).insertOne(payload)
  }

  static editById (id, payload) {
    return getDatabase().collection(collectionMovies).findOneAndUpdate({
      _id: ObjectId (id)
    }, {
      $set : payload
    }, {
      returnOriginal: false
    })
  }

  static deleteById (id) {
    return getDatabase().collection(collectionMovies).findOneAndDelete({
      _id: ObjectId (id)
    }, {
      returnOriginal: false
    })
  }
}

module.exports = Movie