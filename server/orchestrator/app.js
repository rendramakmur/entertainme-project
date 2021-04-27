const { ApolloServer } = require('apollo-server')
const { application } = require('./application')

const schema = application.createSchemaForApollo()

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`Orchestrator server listening at ${url}`);
});