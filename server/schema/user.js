const { GraphQLError } = require('graphql');
const { hashPassword } = require("../helpers/bcrypt");
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
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    register(user: UserInput!): User
  }

  input UserInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.getUserAll();
      return users;
    },
  },

  Mutation: {
    register: async (_, { user }) => {
      try {
        const { username, email, password } = user;

        if (!username || !email || !password) {
          throw new GraphQLError('Username, email, and password are required', {
            extensions: { code: '400 Bad Request' },
          });
        }

        if (!email.includes('@')) {
          throw new GraphQLError('Invalid email format', {
            extensions: { code: '400 Bad Request' },
          });
        }

        if (password.length < 5) {
          throw new GraphQLError('Password must be more than 5 characters', {
            extensions: { code: '400 Bad Request' },
          });
        }

        const existingUser = await User.getUserToAdd(email, username);

        if (existingUser) {
          const field = existingUser.email === email ? 'email' : 'username';
          throw new GraphQLError(`${field} already exists.`, {
            extensions: { code: '400 Bad Request' },
          });
        }

        const result = await User.addUser({
          ...user,
          password: hashPassword(password),
        });

        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };