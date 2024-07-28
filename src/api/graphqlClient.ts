import {ApolloClient, InMemoryCache, HttpLink, createHttpLink} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";


const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

console.log(import.meta.env.VITE_ACCESS_TOKEN)

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: import.meta.env.VITE_ACCESS_TOKEN ? `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
