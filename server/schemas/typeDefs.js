const { gql } = require("apollo-server-express");

// (LEE) Type defs for graphQL operations
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

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(
      authors: [String]
      description: String
      title: String
      bookId: String
      image: String
      link: String
    ): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;
