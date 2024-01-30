const User = require("../models/User");

// const users = [
//     {
//         name: "admin",
//         username: "admin",
//         email: "admin",
//         password: "admin"
//     }
// ]

const typeDefs = `#graphql
 
  type User {
    name: String
    username: String
    email: String
    password: String
  }

 
  type Query {
    users: [User]
  }
`;

const resolvers = {

  Query: {
    users: async () => {
      const users = await User.getUserAll()
      return users
    }
  }
}

module.exports = { typeDefs, resolvers }