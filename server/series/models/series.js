const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

const databaseSeries = 'series'

class Series {
  static findAll () {
    return getDatabase().collection(databaseSeries).find().toArray()
  }

  static findById (id) {
    return getDatabase().collection(databaseSeries).findOne({
      _id: ObjectId(id)
    })
  }

  static insert (payload) {
    return getDatabase().collection(databaseSeries).insertOne(payload)
  }

  static editById (id, payload) {
    return getDatabase().collection(databaseSeries).findOneAndUpdate({
      _id: ObjectId(id)
    }, {
      $set: payload
    }, {
      returnOriginal: false
    })
  }

  static deleteById (id) {
    return getDatabase().collection(databaseSeries).findOneAndDelete({
      _id: ObjectId(id)
    }, {
      returnOriginal: false
    })
  }
}

module.exports = Series