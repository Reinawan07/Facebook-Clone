const Post = require("../models/Posts");

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