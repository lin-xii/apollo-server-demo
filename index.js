import express from "express";
import http from "http";
import { ApolloServer, gql } from "apollo-server-express";

const app = express();
const httpServer = http.createServer(app);

// schema, 本质是一堆类型的定义
// typeDefs, 本质是一堆类型的定义、组成的字符串。其实就是schema的字符串形式
// 其实，算是一个东西
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
    favoriteColor: AllowedColor
  }
  enum AllowedColor {
    RED
    GREEN
    BLUE
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  // AllowedColor: {
  //   RED: "#f00",
  //   GREEN: "#0f0",
  //   BLUE: "#00f",
  // },
  Query: {
    books: () => books,
    favoriteColor: () => "RED",
    // favoriteColor: () => "#00f",
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/" });

httpServer.listen({ port: 4000 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
});
