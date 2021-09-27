const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String 
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String 
    authors: [String]
    title: String 
    description: String 
    image: String 
    link: String 
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input bookInfo {
    bookId: String! 
    authors: [String]
    description: String
    image: String 
    link: String 
    title: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser (username: String!, email: String!, password: String!): Auth
    saveBook (bookInfo: bookInfo!): User
    removeBook (bookId: ID!): User
  }
`;

module.exports = typeDefs;