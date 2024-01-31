const Follow = require("../models/Follow");
const { GraphQLError } = require('graphql');

const typeDefs = `#graphql

    type Follow {
        _id: ID
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
    }

    type Mutation {
    follow(userId: ID): Follow
  }

`;

const resolvers = {
    Mutation: {
        follow: async (parent, args, contextValue) => {
            try {
                const currentUser = await contextValue.authentication();
                const { userId } = args;

                const follows = await Follow.getFollow(userId, currentUser.id);
                if (follows) {
                    throw new GraphQLError('Already following', {
                        extensions: { code: '400 Bad Request' },
                    });
                }

                const follow = await Follow.followUser(userId, currentUser.id);
                return follow;
            } catch (error) {
                throw error;
            }
        },
    },
};

module.exports = { typeDefs, resolvers }