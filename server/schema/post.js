const Post = require("../models/Posts");

const typeDefs = `#graphql
scalar Date
 
 type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comment]
    likes: [Like]
    createdAt: Date
    updatedAt: Date
    user: User
  }

  type Comment {
    content: String!
    username: String!
    createdAt: Date
    updatedAt: Date
  }

  type Like {
    username: String!
    createdAt: Date
    updatedAt: Date
  }


  type Query {
    posts: [Post]
  }
`;

const resolvers = {

    Query: {
        posts: async () => {
            const posts = await Post.getPostAll()
            return posts
        }
    }
}

module.exports = { typeDefs, resolvers }