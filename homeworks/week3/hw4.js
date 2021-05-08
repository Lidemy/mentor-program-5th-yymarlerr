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
  const string = lines
  let result = ''
  for (let i = 1; i <= string.length; i++) {
    result += string[string.length - i]
  }
  if (string === result) {
    return true
  } else {
    return false
  }
}
