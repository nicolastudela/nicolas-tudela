import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`
export const resolvers = {}

export { default as GET_RESUME } from './Resume'
export * from './User'
