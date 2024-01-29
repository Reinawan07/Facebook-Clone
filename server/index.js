require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schema/user');
// const { connect } = require('./config/mongodb');

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers]
})

startStandaloneServer(server, {
  listen: { port: 3000 },
}).then(({ url }) => {
  // connect()
  console.log(`🚀  Server ready at: ${url}`);
})


