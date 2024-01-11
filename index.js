import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// schema, 本质是一堆类型的定义
// typeDefs, 本质是一堆类型的定义、组成的字符串。其实就是schema的字符串形式
// 其实，算是一个东西
const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
    favoriteColor: AllowedColor
    commonVulnType: VulnType
    colors: ColorHex
  }
  enum AllowedColor {
    RED
    GREEN
    BLUE
  }
  type EnabledColor implements ColorHex {
    hex: String
    enabled: Boolean
  }
  type DisabledColor implements ColorHex {
    hex: String
    disabled: Boolean
  }
  enum VulnType {
    IP
    WEB
  }
  union AllColor = EnabledColor | DisabledColor
  interface ColorHex {
    hex: String
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
  AllowedColor: {
    RED: "#f00",
    GREEN: "#0f0",
    BLUE: "#00f",
  },
  AllColor: {
    __resolveType(obj, context, info) {
      if (obj.enabled) {
        return "EnabledColor";
      }
      if (obj.disabled) {
        return "DisabledColor";
      }
      return null;
    },
  },
  ColorHex: {
    __resolveType(obj, context, info) {
      if (obj.enabled) {
        return "EnabledColor";
      }
      if (obj.disabled) {
        return "DisabledColor";
      }
      return null;
    },
  },
  // 完全不需要搞parse、format。。弄个object来回的转换，还得写俩函数。。。。
  VulnType: {
    IP: 1,
    WEB: 2,
  },
  Query: {
    books: () => books,
    favoriteColor: () => "#00f",
    commonVulnType: () => 2,
    colors: () => {
      return { hex: "#f00", disabled: true };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(apolloServer, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
