const Post = require("../models/Posts");
const { GraphQLError } = require('graphql');


// const posts = [
//   {
//     "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "tags": ["tag1", "tag2", "tag3"],
//     "imgUrl": "https://example.com/image.jpg",
//     "authorId": "user123",
//     "comments": [
//       {
//         "content": "Great post!",
//         "username": "commenter1",
//         "createdAt": "2024-01-29T12:30:00.000Z",
//         "updatedAt": "2024-01-29T12:30:00.000Z"
//       },
//       {
//         "content": "Interesting content!",
//         "username": "commenter2",
//         "createdAt": "2024-01-29T13:45:00.000Z",
//         "updatedAt": "2024-01-29T13:45:00.000Z"
//       }
//     ],
//     "likes": [
//       {
//         "username": "liker1",
//         "createdAt": "2024-01-29T14:00:00.000Z",
//         "updatedAt": "2024-01-29T14:00:00.000Z"
//       },
//       {
//         "username": "liker2",
//         "createdAt": "2024-01-29T14:15:00.000Z",
//         "updatedAt": "2024-01-29T14:15:00.000Z"
//       }
//     ],
//     "createdAt": "2024-01-29T10:00:00.000Z",
//     "updatedAt": "2024-01-29T14:30:00.000Z"
//   },
//   {
//     "content": "Another post with different content.",
//     "tags": ["tag4", "tag5"],
//     "imgUrl": "https://example.com/another-image.jpg",
//     "authorId": "user456",
//     "comments": [
//       {
//         "content": "Nice post!",
//         "username": "commenter3",
//         "createdAt": "2024-01-29T11:15:00.000Z",
//         "updatedAt": "2024-01-29T11:15:00.000Z"
//       }
//     ],
//     "likes": [
//       {
//         "username": "liker3",
//         "createdAt": "2024-01-29T12:00:00.000Z",
//         "updatedAt": "2024-01-29T12:00:00.000Z"
//       }
//     ],
//     "createdAt": "2024-01-29T09:45:00.000Z",
//     "updatedAt": "2024-01-29T12:30:00.000Z"
//   }
// ]

const typeDefs = `#graphql
 
 type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    user: User
  }

  type Comment {
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Like {
    username: String!
    createdAt: String
    updatedAt: String
  }

  input NewPost {
    content: String!
    tags: [String]
    imgUrl: String
  }

  type Query {
    posts: [Post]
    postsById(id: ID!): Post
  }

  type Mutation {
    addPost(post: NewPost!): Post
  }
`;

const resolvers = {
  // (parent, args, contextValue, info)
  Query: {

    posts: async (parent, args, contextValue) => {
      await contextValue.authentication();
      const result = await Post.getPostAll()
      return result
    },

    postsById: async (_, { id }) => {
      try {
        const result = await Post.getPostrById(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addPost: async (_, { post }, contextValue) => {
      try {
        const user = await contextValue.authentication();
        const { content, tags, imgUrl} = post;

        if (!content) {
          throw new GraphQLError('Content is required', {
            extensions: { code: '400 Bad Request' },
          });
        }

        const result = await Post.addPost({
          content,
          tags,
          imgUrl,
          authorId: user.id
        })
        return result;
      } catch (error) {
        throw error;
      }
    },
  }
}

module.exports = { typeDefs, resolvers }