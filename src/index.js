const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const connectDB = require("./utils/db");
const bookResolver = require("./resolvers/bookResolver");
const userResolver = require("./resolvers/userResolver");

const app = express();
connectDB();

const schema = buildSchema(`
  type Book {
    _id: ID!
    title: String
    author: String
    owner: ID
    available: Boolean!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    booksOwned: [Book!]!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    users : [User!]!
    user(id: ID!): User!
  }
  

  type Mutation {
    addBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String, author: String): Book!
    deleteBook(id: ID!): Book!

    borrowBook(bookId: ID!,  userId: ID!): Book!
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: String!
    updateUser(id: ID!, username: String, email: String, password: String): User!
    deleteUser(id: ID!): User!
  }
`);

const rootResolver = {
  ...bookResolver,
  ...userResolver,
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
