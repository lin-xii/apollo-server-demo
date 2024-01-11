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

export default typeDefs;
