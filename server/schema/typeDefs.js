const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String 
    savedBooks: [Book]
  }

  type Book {
    bookId: String 
    authors: [String]
    description: String 
    image: String 
    link: String 
    title: String 
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me (_id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser (username: String!, email: String!, password: String!): User
    saveBook (bookId: String!): User
    deleteBook (bookId: String!): User
  }
`;

module.exports = typeDefs;