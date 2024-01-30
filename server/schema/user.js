const { GraphQLError } = require('graphql');
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const User = require("../models/User");
const { signToken } = require('../helpers/jwt');

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

  type Token {
    access_token: String!
  }

  type Mutation {
    register(user: UserInput!): User
    login(email: String!, password: String!): Token
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

    login: async (_, args) => {
      try {
        const { email, password } = args;
        const user = await User.getUserToAdd(email);

        if (!user || !comparePassword(password, user.password)) {
          throw new GraphQLError('Invalid email/password', {
            extensions: { code: '401 Unauthenticated' },
          });
        }

        return {
          access_token: signToken({
            id: user._id,
            email: user.email,
          }),
        };
      } catch (error) {
        throw error;
      }
    },
  }
};

module.exports = { typeDefs, resolvers };