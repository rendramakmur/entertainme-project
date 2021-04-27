const { MongoClient } = require('mongodb')

let database = null

function connectMongodb (cb) {
  const uri = 'mongodb://localhost:27017'
  const uri_atlas = 'mongodb+srv://entertainme-user:admin@cluster0.zglnu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  
  const client = new MongoClient(uri_atlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  client.connect()
    .then(_ => {
      database = client.db('entertainme')
      cb(true)
    })
    .catch(err => {
      cb(false)
      console.log(err);
    })
}

function getDatabase () {
  return database
}

module.exports = {
  connectMongodb,
  getDatabase
}
