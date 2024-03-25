const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const connectDB = require('./utils/db');
const bookResolver = require('./resolvers/bookResolver');
const userResolver = require('./resolvers/userResolver');
const bookSchema = require('./schemas/bookSchema');
const userSchema = require('./schemas/userSchema');

const app = express();
connectDB();

const schema = makeExecutableSchema({
  typeDefs: [bookSchema, userSchema],
  resolvers: [bookResolver, userResolver],
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
