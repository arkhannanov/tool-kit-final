// src/api/graphqlClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const graphqlClient = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer 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`
    }
});

export default graphqlClient;
