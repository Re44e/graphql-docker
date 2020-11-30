import start from './server'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

start(
  {typeDefs, resolvers},
);