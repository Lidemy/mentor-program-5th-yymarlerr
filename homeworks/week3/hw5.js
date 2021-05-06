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
  for (let i = 1; i < lines.length; i++) {
    const str = lines[i].split(' ')
    const first = BigInt(str[0])
    const second = BigInt(str[1])
    const decideWhowin = Number(str[2])
    bigOrsmall(first, second, decideWhowin)
  }
}

function bigOrsmall(a, b, c) {
  if (c === 1) {
    if (a - b < 0) {
      console.log('B')
    } else if (a - b > 0) {
      console.log('A')
    } else {
      console.log('DRAW')
    }
  }
  if (c === -1) {
    if (a - b < 0) {
      console.log('A')
    } else if (a - b > 0) {
      console.log('B')
    } else {
      console.log('DRAW')
    }
  }
}
