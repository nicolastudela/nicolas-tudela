import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`
export const resolvers = {}

export const useCRUDMutation = (
  mutation,
  { queryToRefresh, objectToRefresh, refreshOperation }
) => {
  return useMutation(mutation.gql, {
    update(
      cache,
      {
        data: { [mutation.operationName]: entity },
      }
    ) {
      const toRefresh = cache.readQuery({ query: queryToRefresh })[
        objectToRefresh
      ]
      cache.writeQuery({
        query: queryToRefresh,
        data: {
          [objectToRefresh]: {
            ...toRefresh,
            ...refreshOperation(toRefresh, entity),
          },
        },
      })
    },
  })
}

export * from './Resume'
export * from './User'
