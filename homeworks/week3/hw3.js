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
    const number = Number(lines[i])
    if (isPrime(number) === true) {
      console.log('Prime')
    } else if (isPrime(number) === false) {
      console.log('Composite')
    }
  }
}

function isPrime(n) {
  if (n === 1) {
    return false
  }
  for (let i = 2; i <= n; i++) {
    if (n % i === 0 && n !== i) {
      return false
    } else if (n % i === 0 && n === i) {
      return true
    }
  }
}
