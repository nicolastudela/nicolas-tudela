/* eslint-disable no-console */

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { resolvers, typeDefs } from 'graphqlSchema'
import config from './config'

const cache = new InMemoryCache()

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token')
        ? `Bearer ${localStorage.getItem('token')}`
        : null,
    },
  }))

  return forward(operation)
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    authMiddleware,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: `${config.solariAPIUrl}/graphql`,
      credentials: 'same-origin',
    }),
  ]),
  typeDefs,
  resolvers,
})

cache.writeData({
  data: {
    isLoggedIn: false,
  },
})

export default client
