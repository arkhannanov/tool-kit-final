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
