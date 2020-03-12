const t = require('@babel/types')
const generate = require('@babel/generator')
console.log(generate)
const d = t.objectMethod('get', t.identifier('test'), [], t.blockStatement([]))

const a = t.jsxNamespacedName(t.jsxIdentifier("ddd"), t.jsxIdentifier("bb"))
const aaa = t.objectExpression([t.objectProperty(t.identifier("test"), t.stringLiteral("4343"))])
const code = generate.default(aaa)
const aasd = generate.default(aaa, {
  minified: true,
  concise: true,
  jsescOption: {
    quotes: "double",
    json: true
  }
})

console.log(3232, code.code.replace(/\n/g, ""))
console.log(2323, eval(`var c = ${aasd.code}`))
console.log(c)

const aa = require("@babel/parser")
const d333 = aa.parse("<div></div>", {
  sourceType: "module",
  plugins: [
    "jsx"

  ]
})
console.log(d333.program.body[0].expression)