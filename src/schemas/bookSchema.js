const { gql } = require("apollo-server-express");

module.exports = gql`
  type Book {
    _id: ID!
    title: String
    author: String
    available: Boolean
    owner: User
  }

  type BorrowRequest {
    _id: ID!
    book: Book
    borrower: User
    owner: User
    approved: Boolean!
  }

  extend type Query {
    books: [Book!]!
    book(id: ID!): Book
    borrowRequests: [BorrowRequest!]!
  }

  extend type Mutation {
    addBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String, author: String): Book!
    deleteBook(id: ID!): Book!
    borrowBook(bookId: ID!, userId: ID!): BorrowRequest!
    approveBorrowRequest(requestId: ID!): BorrowRequest!
  }
`;
