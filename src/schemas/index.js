import fs from "fs";
import path from "path";
// schema, 本质是一堆类型的定义
// typeDefs, 本质是一堆类型的定义、组成的字符串。其实就是schema的字符串形式
// 其实，算是一个东西

const typeDefs = readCwdFiles("src/schemas");

function readCwdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filename = path.join(dir, file);
    const stat = fs.statSync(filename);
    if (stat && stat.isDirectory()) {
      /* 递归读取子目录 */
      results = results.concat(readCwdFiles(file));
    } else if (path.extname(file) === ".gql") {
      /* 读取 .gql 文件内容 */
      const content = fs.readFileSync(filename, { encoding: "utf-8" });
      results.push(content);
    }
  });
  return results;
}

export default typeDefs;
