import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import express from "express";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";
import typeDefs from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";

const app = express();
const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginInlineTrace({
      includeErrors: {
        unmodified: true,
      },
    }),
    responseCachePlugin(),
    // ApolloServerPluginCacheControl({
    //   defaultMaxAge: 5,
    // }),
  ],
});
await apolloServer.start();

app.use("/", cors(), express.json(), expressMiddleware(apolloServer));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
