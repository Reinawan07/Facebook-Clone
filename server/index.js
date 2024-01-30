require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schema/user');
const { typeDefs: postTypeDefs, resolvers: postResolvers } = require('./schema/post');
const authentication = require('./middleware/authentication');
const { connect } = require('./config/mongodb');

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs],
  resolvers: [userResolvers, postResolvers],
})

connect()
  .then(() => {
    return startStandaloneServer(server, {
      listen: { port: process.env.PORT || 3000 },
      context: async ({ req }) => {
        return {
          authentication: () => authentication(req),
        };
      },
    });
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  });


