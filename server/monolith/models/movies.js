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

  static insert (value) {
    return getDatabase().collection(collectionMovies).insertOne(value)
  }

  static editById (id, value) {
    return getDatabase().collection(collectionMovies).updateOne({
      _id: ObjectId (id)
    }, {
      $set : value
    })
  }

  static deleteById (id) {
    return getDatabase().collection(collectionMovies).deleteOne({
      _id: ObjectId (id)
    })
  }
}

module.exports = Movie