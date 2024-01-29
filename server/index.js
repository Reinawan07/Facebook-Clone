const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schema/user');

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers]
})

startStandaloneServer(server, {
  listen: { port: 3000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
})


