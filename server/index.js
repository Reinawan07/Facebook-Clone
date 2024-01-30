require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schema/user');
const { typeDefs: postTypeDefs, resolvers: postResolvers } = require('./schema/post');
// const { connect } = require('./config/mongodb');

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs],
  resolvers: [userResolvers, postResolvers],
})

startStandaloneServer(server, {
  listen: { port: 3000 },
}).then(({ url }) => {
  // connect()
  console.log(`🚀  Server ready at: ${url}`);
})


