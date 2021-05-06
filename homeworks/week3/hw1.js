const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const qty = Number(lines[0])
  let star = ''
  for (let i = 1; i <= qty; i++) {
    star = 'star + *'
    console.log(star)
  }
}
