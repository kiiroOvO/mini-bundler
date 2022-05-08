import fs from "fs"
import parser from "@babel/parser"
import traverse from "@babel/traverse"
import * as babel from "babel-core"
import * as path from "path"
let ID = 0;
function createAsset(filePath) {
  const source = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  })
  // transform to ast
  // @balbel/parser
  const ast = parser.parse(source, {
    sourceType: "module"
  })
  // console.log(ast);
  // console.log(traverse);
  const dependencies = []
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      dependencies.push(node.source.value)
    }
  })
  const id = ID++;
  // babel-core + babel-preset-env
  // @babel/code 和 @babel/preset-env 这里有点问题
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['env']
  })
  return { id, path: filePath, source, dependencies, code }

}


function createGraph(entry) {
  const mainAsset = createAsset(entry)

  const queue = [mainAsset]
  // forEach 和 for..of 在这里有差异
  for (const asset of queue) {
    // 相对路径
    const dirname = path.dirname(asset.path)
    // import relationship
    asset.mapping = {};
    asset.dependencies.forEach((relativePath) => {
      // relative -> absolute
      const absolutePath = path.resolve(dirname, relativePath)
      const child = createAsset(absolutePath)
      asset.mapping[relativePath] = child.id

      queue.push(child)
    })
  }
  return queue
}
function bundle(graph) {
  let modules = ``;
  graph.forEach((module) => {
    modules += `${modules}${module.id}:[
      function(require,module,exports){
        ${module.code}
      },
      ${JSON.stringify(module.mapping)}
    ],` // ","
  })
  // cjs
  const result = `
    (function(modules){
      function require(id){
        const [fn,mapping] = modules[id];

        function localRequire(relativePath){
          return require(mapping[relativePath]);
        }

        const module = { exports:{} };
        fn(localRequire,module,module.exports);
        return module.exports
      }
      require(0);
    })({${modules}})
  `
  return result
}



function build(entryPath) {
  const dir = "./dist"
  const graph = createGraph(entryPath)
  console.log(graph);

  const result = bundle(graph)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  fs.writeFileSync(`${dir}/output.js`, result, {})
}

build('./example/entry.js')
