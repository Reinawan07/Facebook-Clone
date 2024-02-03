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
    _id: ID
    name: String
    username: String!
    email: String!
    profileImage: String
    password: String
  }

  type UserById {
    _id: ID
    name: String
    username: String!
    email: String!
    profileImage: String
    following: User
    followers: User
  }


  type Token {
    access_token: String!
  }

  type Mutation {
    register(user: UserInput!): User
    login(username: String!, password: String!): Token
  }

  input UserInput {
    # _id: ID
    name: String
    username: String!
    email: String!
    profileImage: String
    password: String!
  }

  type Query {
    users: [User]
    userById(id: ID!): UserById
    searchUsers(query: String!): [User]
  }
`;

const DEFAULT_PROFILE_IMAGE = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-9…';

const resolvers = {
  Query: {
    users: async (parent, args, contextValue) => {
      await contextValue.authentication();
      const users = await User.getUserAll();
      return users;
    },

    userById: async (_, { id }, contextValue) => {
      try {
        await contextValue.authentication();
        const user = await User.getUserById(id);
        console.log(user);
        return user;
      } catch (error) {
        throw error;
      }
    },

    searchUsers: async (_, { query }, contextValue) => {
      try {
        await contextValue.authentication();
        const users = await User.searchUsers(query);
        return users;
      } catch (error) {
        throw error;
      }
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
          profileImage: DEFAULT_PROFILE_IMAGE,
          password: hashPassword(password),
        });

        return result;
      } catch (error) {
        throw error;
      }
    },

    login: async (_, args) => {
      try {
        const { username, password } = args;
        const user = await User.getUserToLogin(username);

        if (!user || !comparePassword(password, user.password)) {
          throw new GraphQLError('Invalid username/password', {
            extensions: { code: '401 Unauthenticated' },
          });
        }

        return {
          access_token: signToken({
            id: user._id,
            username: user.username,
          }),
        };
      } catch (error) {
        throw error;
      }
    },
  }
};

module.exports = { typeDefs, resolvers };