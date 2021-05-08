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
  const range = lines[0].split(' ')
  const minimum = Number(range[0])
  const max = Number(range[1])
  for (let i = minimum; i <= max; i++) {
    if (i === isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function countDigit(n) {
  if (n === 0) {
    return 1
  }
  for (let i = 1; i < 10e5; i++) {
    n = n / 10
    if (n < 1) {
      return i
    }
  }
}

function specifyNumber(n) {
  const arr = []
  for (let i = 1; i < 10e5; i++) {
    arr.push(Math.floor(n) % 10)
    n = n / 10
    if (n < 1) { break }
  } return arr
}

function isNarcissistic(n) {
  const a = countDigit(n)
  const b = specifyNumber(n)
  let sum = 0
  for (let i = 0; i < b.length; i++) {
    sum += b[i] ** a
  }
  return sum
}
