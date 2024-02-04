import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';


const httpLink = createHttpLink({
    uri: 'https://ch1.reinawan.fun/',
});

const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync('accessToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});


const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default apolloClient 