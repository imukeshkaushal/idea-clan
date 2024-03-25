const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    role: UserRole!
   
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  extend type Query {
    users : [User!]!
    user(id:ID!): User
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: String!
    updateUser(id: ID!, username: String, email: String, password: String): User!
    deleteUser(id: ID!): User!
  }
`;
