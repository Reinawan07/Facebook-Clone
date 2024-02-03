import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'https://1c92-101-255-140-70.ngrok-free.app',
    cache: new InMemoryCache()
})

export default apolloClient 