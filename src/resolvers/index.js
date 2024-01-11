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

export default resolvers;
