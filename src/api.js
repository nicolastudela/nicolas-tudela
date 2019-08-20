import ApolloClient from 'apollo-boost'
import config from './config'

const apolloClient = new ApolloClient({
  uri: `${config.solariAPIUrl}/graphql`,
})

export default apolloClient
