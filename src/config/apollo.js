import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { setContext } from 'apollo-link-context'

const cache = new InMemoryCache()

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      'x-token': token ? `${token}` : '',
    },
  }
})

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URI,
  credentials: 'same-origin',
})

const stateLink = withClientState({
  defaults: {
    isConnected: true,
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        cache.writeData({ data: { isConnected } })
        return null
      },
    },
  },
  cache,
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, stateLink, httpLink]),
  cache,
})

export default client
