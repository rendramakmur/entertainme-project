import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_WATCHLISTS } from '../queries'

export const cache = new InMemoryCache ({
  typePolicies: {
    Query: {
      fields: {
        favorites: {
          
        }
      }
    }
  }
})

const client = new ApolloClient ({
  uri: 'http://18.212.165.45:4000/',
  cache
})

cache.writeQuery({
  query: GET_WATCHLISTS,
  data: {
    watchlists: []
  }
})

export default client