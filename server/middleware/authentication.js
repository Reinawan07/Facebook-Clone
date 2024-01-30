const { GraphQLError } = require('graphql');
const User = require('../models/User');
const { verifyToken } = require('../helpers/jwt');


const authentication = async (req) => {
    try {
        let access_token = req.headers.authorization;

        if (!access_token) {
            throw new GraphQLError('Invalid token', {
                extensions: { code: '401 Unauthenticated' },
            });
        }

        access_token = access_token.replace('Bearer ', '');
        const { id } = verifyToken(access_token);
        const user = await User.getUserById(id);

        if (!user) {
            throw new GraphQLError('Invalid token', {
                extensions: { code: '401 Unauthenticated' },
            });
        }

        return {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
        };
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw new GraphQLError('Invalid token', {
                extensions: { code: '401 Unauthenticated' },
            });
        }

        throw error;
    }
};

module.exports = authentication;