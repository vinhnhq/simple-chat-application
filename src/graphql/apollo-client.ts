import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql';
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri,
  cache,
});

export { client };
