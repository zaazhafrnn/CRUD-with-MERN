const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const { resolvers } = require("./models/resolver.js");
const { typeDefs } = require("./models/typeDef.js");
const { GraphQLDate } = require('graphql-scalars');

const MONGO_URI = "mongodb://localhost:27017/project";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch(err => {
    console.log(err.message);
  });

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  schemaDirectives: {
    date: GraphQLDate,
  },
});

startStandaloneServer(server, {
  listen: { port: 8000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});