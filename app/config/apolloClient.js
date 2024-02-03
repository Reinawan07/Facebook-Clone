import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';


const httpLink = createHttpLink({
    uri: 'https://1c92-101-255-140-70.ngrok-free.app',
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