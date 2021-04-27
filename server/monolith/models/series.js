const { getDatabase } = require("../config/mongodb")
const { ObjectId } = require('mongodb')

const collectionSeries = 'series'

class Series {
  static findAll () {
    return getDatabase().collection(collectionSeries).find().toArray()
  }

  static findById (id) {
    return getDatabase().collection(collectionSeries).findOne({
      _id: ObjectId (id)
    })
  }

  static insert (value) {
    return getDatabase().collection(collectionSeries).insertOne(value)
  }

  static editById (id, value) {
    return getDatabase().collection(collectionSeries).updateOne({
      _id: ObjectId (id)
    }, {
      $set : value
    })
  }

  static deleteById (id) {
    return getDatabase().collection(collectionSeries).deleteOne({
      _id: ObjectId (id)
    })
  }
}

module.exports = Series