import { readFileSync } from "fs";
// schema, 本质是一堆类型的定义
// typeDefs, 本质是一堆类型的定义、组成的字符串。其实就是schema的字符串形式
// 其实，算是一个东西

const typeDefs = readFileSync("src/schemas/query.gql", { encoding: "utf-8" });
// console.log(process.cwd());
// readFileSync,是root directory下的相对路径。
// cwd: code/apollo-server-demo

export default typeDefs;
