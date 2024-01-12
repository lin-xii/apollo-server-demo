import { books } from "../localStorage.js";

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
  Library: {
    name: (parent, args, context, { cacheControl }) => {
      // cacheControl.setCacheHint({ maxAge: 5 });
      // console.log(parent);
      // console.log(info.cacheControl);
      // console.log("Library.name", cacheControl.cacheHint.maxAge);
      return generateRandomBookTitle();
    },
    books: (parent, args, context, { cacheControl }) => {
      // console.log(info.cacheControl);
      // console.log("Library.books", cacheControl.cacheHint.maxAge);
      return [
        {
          title: generateRandomBookTitle(),
          author: Math.random().toFixed(2),
        },
      ];
    },
  },
  Query: {
    books: () => {
      // console.log("books");
      return books;
    },
    library: (_, { country }, context, { cacheControl }) => {
      // console.log(country);
      // console.log(info.cacheControl);
      // console.log("library", cacheControl);
      return [{}];
      return [
        {
          name: generateRandomBookTitle(),
          books: [
            {
              title: generateRandomBookTitle(),
              author: Math.random().toFixed(2),
            },
          ],
        },
      ];
    },
    favoriteColor: () => "#00f",
    commonVulnType: () => 2,
    colors: () => {
      return { hex: "#f00", disabled: true };
    },
  },
};

export default resolvers;

function generateRandomBookTitle() {
  const adjectives = [
    "Amazing",
    "Incredible",
    "Fantastic",
    "Magical",
    "Mysterious",
    "Secret",
    "Hidden",
    "Lost",
    "Unseen",
    "Forgotten",
  ];
  const nouns = [
    "Journey",
    "Quest",
    "Adventure",
    "Discovery",
    "Secret",
    "Treasure",
    "Realm",
    "World",
    "Dream",
    "Destiny",
  ];
  const themes = [
    "of Time",
    "of Space",
    "of Love",
    "of Destiny",
    "of Dreams",
    "of Magic",
    "of Shadows",
    "of Light",
    "of the Unknown",
    "of the Ancients",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  return `${randomAdjective} ${randomNoun} ${randomTheme}`;
}
